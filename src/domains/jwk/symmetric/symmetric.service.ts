import { JWK, JWS, util as joseUtil } from "node-jose";
import fs from "fs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpError, UnauthorizeError } from "exceptions";
import { JWKKeys, JWKType, TokenType } from "types";
import { getTokenExpUnix, fetchJwks, getJwkContents, getJwkFile } from "utils";

export const add = async (kid: string): Promise<JWKKeys> => {
  const ks = getJwkContents(JWKType.SYMMETRIC);
  const keyStore = ks ? await JWK.asKeyStore(ks) : JWK.createKeyStore();

  const jwkKey = keyStore.get(kid);
  if (jwkKey) {
    return jwkKey.toJSON();
  }

  const newJwkKey = await keyStore.generate("oct", 256, {
    kid,
    alg: "HS256",
    k: joseUtil.base64url.encode(joseUtil.randomBytes(32)),
  });

  fs.writeFileSync(
    getJwkFile(JWKType.SYMMETRIC),
    JSON.stringify(keyStore.toJSON(true), null, 1)
  );

  return newJwkKey.toJSON();
};

export const remove = async (kid: string): Promise<void> => {
  const ks = getJwkContents(JWKType.SYMMETRIC);
  if (!ks) {
    throw new HttpError(404, "jwk keys does not exists");
  }
  const keyStore = await JWK.asKeyStore(ks);
  if (!keyStore) {
    throw new HttpError(404, "jwk keys does not exists");
  }

  const jwkKey = keyStore.get(kid);
  if (!jwkKey) {
    throw new HttpError(404, "jwk key not found");
  }

  keyStore.remove(jwkKey);

  fs.writeFileSync(
    getJwkFile(JWKType.SYMMETRIC),
    JSON.stringify(keyStore.toJSON(true), null, 1)
  );
};

export const sign = async (
  type: TokenType,
  payload: JwtPayload,
  kid?: string
): Promise<string> => {
  const ks = getJwkContents(JWKType.SYMMETRIC);
  if (!ks) {
    throw new HttpError(400, "jwk_keys_not_exists");
  }
  const keyStore = await JWK.asKeyStore(ks);

  let jwkKey;
  if (kid) {
    jwkKey = keyStore.get("sim1");
  } else {
    const jwkKeys = keyStore.all();
    jwkKey = jwkKeys[0];
  }

  if (!jwkKey) {
    throw new UnauthorizeError("jwk key not found");
  }

  return createToken(type, jwkKey, payload);
};

export const createToken = async (
  type: TokenType,
  jwkKey: JWK.Key,
  payload: JwtPayload
): Promise<string> => {
  const opt = { compact: true };
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

  const header = decodedToken.header;
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

  if (!header.kid) {
    throw new UnauthorizeError("missing_kid");
  }

  const keyStore = await fetchJwks(JWKType.SYMMETRIC);
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
