/**
 * @swagger
 * tags:
 *   name: JwkSymmetric
 *   description: Manage JwkSymmetric
 */
import { Router, Request, Response, NextFunction } from "express";
import { JWKType, TokenType } from "types";

import {
  add,
  remove,
  sign,
  verify,
} from "domains/jwk/symmetric/symmetric.service";
import { getJwkContents, getJwksUrl } from "utils";
import { HttpError } from "exceptions";

const router = Router();

/**
 * @swagger
 * /jwk/symmetric:
 *   get:
 *     summary: JWKS symmetric
 *     tags: [JwkSymmetric]
 *     responses:
 *       "200":
 *         description: JWKS symmetric
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
  const jwksContents = getJwkContents(JWKType.SYMMETRIC);
  if (!jwksContents) {
    throw new HttpError(404, "JWKS not exists");
  }
  res.json({
    jwksUrl: getJwksUrl(JWKType.SYMMETRIC),
    jwksContents: JSON.parse(jwksContents),
  });
});
/**
 * @swagger
 * /jwk/symmetric/add:
 *   post:
 *     summary: Create new JWK symmetric
 *     tags: [JwkSymmetric]
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
 *               kid: sym1
 *
 *     responses:
 *       "200":
 *         description: Created
 */
router.post("/add", (req: Request, res: Response, next: NextFunction) => {
  const kid = req.body.kid;
  add(kid)
    .then((result) => res.json(result))
    .catch(next);
});
/**
 * @swagger
 * /jwk/symmetric/sign:
 *   post:
 *     summary: Sign token by JWK symmetric
 *     tags: [JwkSymmetric]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AuthToken'
 *       "400":
 *         description: Jwk keys not exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Jwk keys not exists
 */
router.post("/sign", (req: Request, res: Response, next: NextFunction) => {
  const { id, role } = req.body;
  sign(TokenType.ACCESS_TOKEN, { sub: id.toString(), role: role })
    .then((token) => res.json({ token }))
    .catch(next);
});
/**
 * @swagger
 * /jwk/symmetric/verify:
 *   post:
 *     summary: Verify token by JWK symmetric
 *     tags: [JwkSymmetric]
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
 *         description: Jwk keys not exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Jwk keys not exists
 */
router.post("/verify", (req: Request, res: Response, next: NextFunction) => {
  verify(req.body.token)
    .then((result) => res.json(result))
    .catch(next);
});
/**
 * @swagger
 * /jwk/symmetric/{kid}:
 *   delete:
 *     summary: Remove JWK symmetric
 *     tags: [JwkSymmetric]
 *     parameters:
 *       - in: path
 *         name: kid
 *         required: true
 *         schema:
 *           type: string
 *         description: Key id
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  remove(req.params.id)
    .then(() => res.status(200).end())
    .catch(next);
});

export default router;
