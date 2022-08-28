import { JWK } from "node-jose";
import axios from "axios";
import fs from "fs";
import { JWKType } from "types";
import { HttpException } from "exceptions";

export const getJwkContents = (type: JWKType): string | null => {
  try {
    const fileBuffer = fs.readFileSync(getJwkFile(type));
    return fileBuffer.toString();
  } catch (error) {
    return null;
  }
};

export const getJwks = async (type: JWKType): Promise<JWK.KeyStore | null> => {
  try {
    const jwkURL = getJwksUrl(type);
    console.log("jwkURL", jwkURL);
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
export const getJwksUrl = (type: JWKType): string => {
  const baseUrl = process.env.BASE_URL as string;
  if (type === JWKType.ASYMMETRIC_PRIVATE) {
    throw new HttpException(403, "Forbidden");
  }
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
