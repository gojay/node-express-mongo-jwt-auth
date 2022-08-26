export type JWKKeys = Record<string, any>;

export enum JWKType {
  ASYMMETRIC_PRIVATE = "asymmetric-private",
  ASYMMETRIC_PUBLIC = "asymmetric-public",
  SYMMETRIC = "symmetric",
}
