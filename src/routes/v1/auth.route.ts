import express from "express";
import { validateRequest } from "middlewares";
import * as authValidation from "../../domains/auth/auth.validation";
import * as authController from "../../domains/auth/auth.controller";

const router = express.Router();

router
  .route("/login")
  .post(validateRequest(authValidation.login), authController.login);

router
  .route("/refresh-token")
  .post(
    validateRequest(authValidation.refreshToken),
    authController.refreshToken
  );

export default router;
