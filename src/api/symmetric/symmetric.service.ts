import { JWK, util as joseUtil } from "node-jose";
import fs from "fs";

const symmetricJwksFile = "jwk/symmetric.json";

export const generateJWKSymmetric = async (): Promise<Record<string, any>> => {
  const keyStore = JWK.createKeyStore();
  const key = await keyStore.generate("oct", 128, {
    kid: "sim1",
    alg: "A128GCM",
    k: joseUtil.base64url.encode(joseUtil.randomBytes(32)),
  });

  await keyStore.add(key);
  const jwkKeys = keyStore.toJSON(true);

  fs.writeFileSync(symmetricJwksFile, JSON.stringify(jwkKeys, null, 1));

  return jwkKeys;
};
