import fs from "fs";
import { JWK, JWS } from "node-jose";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpError, UnauthorizeError } from "exceptions";
import { getTokenExpUnix, getJwkFile, getJwkContents } from "utils";
import { JWKKeys, JWKType, TokenType } from "types";

const jwkPublicKey = getJwkFile(JWKType.ASYMMETRIC_PUBLIC);
const jwkPrivateKey = getJwkFile(JWKType.ASYMMETRIC_PRIVATE);

export const add = async (kid: string): Promise<void> => {
  const ks = getJwkContents(JWKType.ASYMMETRIC_PRIVATE);
  const keyStore = ks ? await JWK.asKeyStore(ks) : JWK.createKeyStore();

  const jwkKey = keyStore.get(kid);
  if (jwkKey) {
    return;
  }

  await keyStore.generate("RSA", 2048, {
    alg: "RS256",
    use: "sig",
    kid,
  });

  const publicKeys = keyStore.toJSON() as JWKKeys;
  publicKeys.keys = publicKeys.keys.reverse();
  const privateKeys = keyStore.toJSON(true) as JWKKeys;
  privateKeys.keys = privateKeys.keys.reverse();

  fs.writeFileSync(
    getJwkFile(JWKType.ASYMMETRIC_PUBLIC),
    JSON.stringify(publicKeys, null, 1)
  );
  fs.writeFileSync(
    getJwkFile(JWKType.ASYMMETRIC_PRIVATE),
    JSON.stringify(privateKeys, null, 1)
  );

  return;
};

export const remove = async (): Promise<void> => {
  const f = getJwkContents(JWKType.ASYMMETRIC_PRIVATE);
  if (!f) return;

  const ks = JSON.parse(f);
  if (ks.keys.length === 1) {
    fs.unlinkSync(jwkPrivateKey);
    fs.unlinkSync(jwkPublicKey);
    return;
  }

  ks.keys.pop();

  const keyStore = await JWK.asKeyStore(JSON.stringify(ks));

  fs.writeFileSync(jwkPublicKey, JSON.stringify(keyStore.toJSON(), null, 1));
  fs.writeFileSync(
    jwkPrivateKey,
    JSON.stringify(keyStore.toJSON(true), null, 1)
  );

  return;
};

export const sign = async (
  type: TokenType,
  payload: JwtPayload
): Promise<string> => {
  try {
    const ks = getJwkContents(JWKType.ASYMMETRIC_PRIVATE);
    if (!ks) {
      throw new HttpError(400, "jwk_keys_not_exists");
    }
    const keyStore = await JWK.asKeyStore(ks);

    const [jwkKey] = keyStore.all({ use: "sig" });
    return createToken(type, jwkKey, payload);
  } catch (error) {
    throw new HttpError(400, (error as Error).message);
  }
};

export const createToken = async (
  type: TokenType,
  jwkKey: JWK.Key,
  payload: JwtPayload
): Promise<string> => {
  const opt = { compact: true, jwk: jwkKey, fields: { typ: "jwt" } };
  const input = JSON.stringify({
    ...payload,
    aud: process.env.JWT_AUDIENCE,
    iss: process.env.JWT_ISSUER,
    exp: getTokenExpUnix(type),
  });
  const signResult = await JWS.createSign(opt, jwkKey).update(input).final();
  return signResult.toString();
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

  const ks = getJwkContents(JWKType.ASYMMETRIC_PRIVATE);
  if (!ks) {
    throw new UnauthorizeError("jwk_keys_not_exists");
  }
  const keyStore = await JWK.asKeyStore(ks);
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
