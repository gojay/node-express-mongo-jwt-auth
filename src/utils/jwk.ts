import { JWK } from "node-jose";
import axios from "axios";
import fs from "fs";
import { JWKType } from "types";

export const getJwkContents = (type: JWKType): string | null => {
  try {
    const fileBuffer = fs.readFileSync(getJwkFile(type));
    return fileBuffer.toString();
  } catch (error) {
    return null;
  }
};

export const fetchJwks = async (
  type: Exclude<JWKType, JWKType.ASYMMETRIC_PRIVATE>
): Promise<JWK.KeyStore | null> => {
  try {
    const jwkURL = getJwksUrl(type);
    const jwkResponse = await axios.get(jwkURL);
    return await JWK.asKeyStore(jwkResponse.data.keys);
  } catch (error) {
    return null;
  }
};

export const getJwkFile = (type: JWKType): string => {
  const filename = getJwkFilename(type);
  switch (type) {
    case JWKType.ASYMMETRIC_PRIVATE:
      return `jwk/private/${filename}`;
    default:
      return `jwk/public/${filename}`;
  }
};
export const getJwksUrl = (
  type: Exclude<JWKType, JWKType.ASYMMETRIC_PRIVATE>
): string => {
  const baseUrl = process.env.BASE_URL as string;
  return `${baseUrl}/.well-known/${getJwkFilename(type)}`;
};

export const getJwkFilename = (type: JWKType): string => {
  switch (type) {
    case JWKType.ASYMMETRIC_PRIVATE:
      return "asymmetric.json";
    case JWKType.ASYMMETRIC_PUBLIC:
      return "jwks-asymmetric.json";
    case JWKType.SYMMETRIC:
      return "jwks-symmetric.json";
  }
};
