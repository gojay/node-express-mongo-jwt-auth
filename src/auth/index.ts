import express from "express";
import { validateRequest } from "middlewares";
import * as authValidation from "./auth.validation";
import * as authController from "./auth.controller";

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
