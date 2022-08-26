import { JWK, JWS } from "node-jose";
import fs from "fs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpException, UnauthorizeError } from "exceptions";
import {
  getJwtExp,
  getJwks,
  getJwkFile,
  getJwkContents,
  getJwksUrl,
} from "utils";
import { JWKType, JWT_TYPE } from "types";

const jwkPublicKey = getJwkFile(JWKType.ASYMMETRIC_PUBLIC);
const jwkPrivateKey = getJwkFile(JWKType.ASYMMETRIC_PRIVATE);

export const add = async (
  kid: string
): Promise<{
  private: string;
  public: string;
}> => {
  const ks = getJwkContents(JWKType.ASYMMETRIC_PRIVATE);
  const keyStore = ks ? await JWK.asKeyStore(ks) : JWK.createKeyStore();

  const jwkKey = keyStore.get(kid);
  if (jwkKey) {
    return {
      private: getJwksUrl(JWKType.ASYMMETRIC_PRIVATE),
      public: getJwksUrl(JWKType.ASYMMETRIC_PUBLIC),
    };
  }

  await keyStore.generate("RSA", 2048, {
    alg: "RS256",
    use: "sig",
    kid,
  });

  fs.writeFileSync(
    getJwkFile(JWKType.ASYMMETRIC_PUBLIC),
    JSON.stringify(keyStore.toJSON(), null, 1)
  );
  fs.writeFileSync(
    getJwkFile(JWKType.ASYMMETRIC_PRIVATE),
    JSON.stringify(keyStore.toJSON(true), null, 1)
  );

  return {
    private: getJwksUrl(JWKType.ASYMMETRIC_PRIVATE),
    public: getJwksUrl(JWKType.ASYMMETRIC_PUBLIC),
  };
};

export const remove = async (): Promise<{
  private: string;
  public: string;
} | null> => {
  const f = getJwkContents(JWKType.ASYMMETRIC_PRIVATE);
  if (!f) return null;

  const ks = JSON.parse(f);
  if (ks.keys.length === 1) {
    fs.unlinkSync(jwkPrivateKey);
    fs.unlinkSync(jwkPublicKey);
    return null;
  }

  ks.keys.pop();

  const keyStore = await JWK.asKeyStore(JSON.stringify(ks));

  fs.writeFileSync(jwkPublicKey, JSON.stringify(keyStore.toJSON(), null, 1));
  fs.writeFileSync(
    jwkPrivateKey,
    JSON.stringify(keyStore.toJSON(true), null, 1)
  );

  return {
    private: getJwksUrl(JWKType.ASYMMETRIC_PRIVATE),
    public: getJwksUrl(JWKType.ASYMMETRIC_PUBLIC),
  };
};

export const sign = async (
  userId: number,
  userRoles: string[]
): Promise<string> => {
  try {
    const keyStore = await getJwks(JWKType.ASYMMETRIC_PRIVATE);
    if (!keyStore) {
      throw new UnauthorizeError("jwk_keys_not_exists");
    }

    const [key] = keyStore.all({ use: "sig" });
    const opt = { compact: true, jwk: key, fields: { typ: "jwt" } };
    const payload = JSON.stringify({
      aud: process.env.JWT_AUDIENCE,
      iss: process.env.JWT_ISSUER,
      sub: userId,
      roles: userRoles,
      exp: getJwtExp(JWT_TYPE.ACCESS_TOKEN),
    });
    const signResult = await JWS.createSign(opt, key).update(payload).final();
    return signResult.toString();
  } catch (error) {
    throw new HttpException(400, (error as Error).message);
  }
};

export const verify = async (token: string): Promise<JwtPayload> => {
  const decodedToken = jwt.decode(token, { complete: true });
  if (!decodedToken) {
    throw new UnauthorizeError("invalid token");
  }

  const payload = decodedToken.payload as JwtPayload;
  if (payload.aud !== process.env.JWT_AUDIENCE) {
    throw new UnauthorizeError("invalid_audience");
  }
  if (payload.iss !== process.env.JWT_ISSUER) {
    throw new UnauthorizeError("invalid_issuer");
  }
  if (!payload.exp || Date.now() >= payload.exp * 1000) {
    throw new UnauthorizeError("token_expired");
  }

  const header = decodedToken.header;
  if (!header.kid) {
    throw new UnauthorizeError("missing_kid");
  }

  const keyStore = await getJwks(JWKType.ASYMMETRIC_PRIVATE);
  if (!keyStore) {
    throw new UnauthorizeError("jwk_keys_not_exists");
  }
  const jwkKey = keyStore.get(header.kid);
  if (!jwkKey) {
    throw new UnauthorizeError("jwk_key_not_found");
  }

  const verifyResult = await JWS.createVerify(jwkKey).verify(token);
  if (!verifyResult) {
    throw new UnauthorizeError("token_not_verify");
  }

  return payload;
};
