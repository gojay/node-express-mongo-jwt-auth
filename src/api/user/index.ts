import express from "express";
import { validateRequest } from "middlewares";
import * as userController from "./user.controller";
import * as userValidation from "./user.validation";

const router = express.Router();

router
  .route("/")
  .get(validateRequest(userValidation.getUsers), userController.getUsers)
  .post(validateRequest(userValidation.createUser), userController.createUser);

router
  .route("/:userId")
  .get(validateRequest(userValidation.getUser), userController.getUser)
  .patch(validateRequest(userValidation.updateUser), userController.updateUser)
  .delete(
    validateRequest(userValidation.deleteUser),
    userController.deleteUser
  );

export default router;
