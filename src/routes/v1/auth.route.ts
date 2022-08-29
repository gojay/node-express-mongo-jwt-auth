/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
import express from "express";
import { validateRequest } from "middlewares";
import * as authValidation from "../../domains/auth/auth.validation";
import * as authController from "../../domains/auth/auth.controller";

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: john.doe@example.com
 *               password: "12345678"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/AuthToken'
 *       "400":
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: incorrect email and password
 */
router
  .route("/login")
  .post(validateRequest(authValidation.login), authController.login);
/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh auth tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refresh_token
 *             properties:
 *               refresh_token:
 *                 type: string
 *             example:
 *               refresh_token: eyJhbGciOiJIUzI1NiIsImtpZCI6InN5bTEifQ.eyJzdWIiOiI2MzBiOTljOWM4NjBmM2JkZDhjNGQ4N2YiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJMb2NhbGhvc3QiLCJleHAiOjE2NjE3Mzk5NTd9.5GBtiYGVfabTIg89wtGdjhqsKXa82jkwdkIK7Qa-zF4
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router
  .route("/refresh-token")
  .post(
    validateRequest(authValidation.refreshToken),
    authController.refreshToken
  );

export default router;
