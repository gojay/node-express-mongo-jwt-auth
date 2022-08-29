/**
 * @swagger
 * tags:
 *   name: JwkAsymmetric
 *   description: Manage JwkAsymmetric
 */
import { Router, Request, Response, NextFunction } from "express";
import { JWKType, TokenType } from "types";

import {
  add,
  remove,
  sign,
  verify,
} from "domains/jwk/asymmetric/asymmetric.service";
import { getJwkContents, getJwksUrl } from "utils";
import { HttpError } from "exceptions";

const router = Router();

/**
 * @swagger
 * /jwk/asymmetric:
 *   get:
 *     summary: JWKS asymmetric
 *     tags: [JwkAsymmetric]
 *     responses:
 *       "200":
 *         description: JWKS asymmetric
 *       "404":
 *         description: JWKS does not exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: JWKS does not exists
 */
router.get("/", (req: Request, res: Response) => {
  const jwksContents = getJwkContents(JWKType.ASYMMETRIC_PUBLIC);
  if (!jwksContents) {
    throw new HttpError(404, "JWKS does not exists");
  }
  res.json({
    jwksUrl: getJwksUrl(JWKType.ASYMMETRIC_PUBLIC),
    jwksContents: JSON.parse(jwksContents),
  });
});

/**
 * @swagger
 * /jwk/asymmetric/add:
 *   post:
 *     summary: Create new JWK asymmetric
 *     tags: [JwkAsymmetric]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kid
 *             properties:
 *               kid:
 *                 type: string
 *             example:
 *               kid: asym1
 *
 *     responses:
 *       "201":
 *         description: Created
 */
router.post("/add", (req: Request, res: Response, next: NextFunction) => {
  add(req.body.kid)
    .then((result) => res.json(result))
    .catch(next);
});
/**
 * @swagger
 * /jwk/asymmetric/sign:
 *   post:
 *     summary: Sign token by JWK asymmetric
 *     tags: [JwkAsymmetric]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - email
 *               - role
 *             properties:
 *               id:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                  type: string
 *             example:
 *               id: 1
 *               email: john.doe@example.com
 *               role: Super Admin
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AuthToken'
 *       "400":
 *         description: JWKS does not exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: JWKS does not exists
 */
router.post("/sign", (req: Request, res: Response, next: NextFunction) => {
  const { id, role } = req.body;
  sign(TokenType.ACCESS_TOKEN, { sub: id.toString(), role: role })
    .then((token) => res.json({ token }))
    .catch(next);
});
/**
 * @swagger
 * /jwk/asymmetric/verify:
 *   post:
 *     summary: Verify token by JWK asymmetric
 *     tags: [JwkAsymmetric]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *             example:
 *                  token: eyJhbGciOiJIUzI1NiIsImtpZCI6InN5bTEifQ.eyJzdWIiOiI2MzBiOTljOWM4NjBmM2JkZDhjNGQ4N2YiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJleHAiOjE2NjE3Mzk5NTd9.5GBtiYGVfabTIg89wtGdjhqsKXa82jkwdkIK7Qa-zF4
 *     responses:
 *       "200":
 *         description: Token payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AuthToken'
 *       "400":
 *         description: JWKS does not exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: JWKS does not exists
 */
router.post("/verify", (req: Request, res: Response, next: NextFunction) => {
  verify(req.body.token)
    .then((result) => res.json(result))
    .catch(next);
});
/**
 * @swagger
 * /jwk/asymmetric:
 *   delete:
 *     summary: Remove JWK asymmetric
 *     tags: [JwkAsymmetric]
 *     parameters:
 *       - in: path
 *         id: kid
 *         required: true
 *         schema:
 *           type: string
 *         description: Key id
 *     responses:
 *       "204":
 *         description: No content
 */
router.delete("/", (_, res: Response, next: NextFunction) => {
  remove()
    .then(() => res.status(200).end())
    .catch(next);
});

export default router;
