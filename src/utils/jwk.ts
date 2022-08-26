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

export const getJwks = async (type: JWKType): Promise<JWK.KeyStore | null> => {
  try {
    const jwkURL = getJwksUrl(type);
    const jwkResponse = await axios.get(jwkURL);
    return await JWK.asKeyStore(jwkResponse.data.keys);
  } catch (error) {
    return null;
  }
};

export const getJwkFile = (type: JWKType): string => {
  switch (type) {
    case JWKType.ASYMMETRIC_PRIVATE:
      return "jwk/asymmetric-private.json";
    case JWKType.ASYMMETRIC_PUBLIC:
      return "jwk/asymmetric-public.json";
    case JWKType.SYMMETRIC:
      return "jwk/symmetric.json";
  }
};
export const getJwksUrl = (type: JWKType): string => {
  const baseUrl = process.env.BASE_URL as string;
  return `${baseUrl}/${getJwkFile(type)}`;
};
