import jose from "node-jose";
import jwksRsa, { GetVerificationKey } from "jwks-rsa";
import { Request } from "express";
import { expressjwt } from "express-jwt";
import expressJwtAuthz from "express-jwt-authz";
import { Jwt } from "jsonwebtoken";
import { fetchJwks, getJwksUrl } from "utils";
import { JWKType } from "types";
import { UnauthorizeError } from "exceptions";

const authJwtSymmetric = expressjwt({
  secret: async (req: Request, token?: Jwt) => {
    const kid = token?.header.kid;
    if (!kid) {
      throw new UnauthorizeError("token_header_kid_not_found");
    }
    const keyStore = await fetchJwks(JWKType.SYMMETRIC);
    if (!keyStore) {
      throw new UnauthorizeError("jwk_keys_not_exists");
    }
    const jwkKey = keyStore.get(kid);
    if (!jwkKey) {
      throw new UnauthorizeError("jwk_key_not_found");
    }
    const jwkKeyObject = jwkKey.toJSON(true) as Record<string, string>;
    if (!jwkKeyObject.k) {
      throw new UnauthorizeError("jwk_secret_key_not_found");
    }
    return jose.util.base64url.decode(jwkKeyObject.k);
  },
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  algorithms: ["HS256"],
});

const authJwtAsymmetric = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: getJwksUrl(JWKType.ASYMMETRIC_PUBLIC),
  }) as GetVerificationKey,
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  algorithms: ["RS256"],
});

export const authJwt = (scopes?: string[]): any => {
  const middlewares = [];
  switch (process.env.JWK_TYPE) {
    case "symmetric":
      middlewares.push(authJwtSymmetric);
      break;
    default:
      middlewares.push(authJwtAsymmetric);
      break;
  }

  if (scopes) {
    const options = {
      customUserKey: "auth",
      customScopeKey: "scopes",
    };
    middlewares.push(expressJwtAuthz(scopes, options));
  }

  return middlewares;
};
