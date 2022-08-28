import express from "express";
import { authJwt, validateRequest } from "middlewares";
import * as userController from "../../domains/user/user.controller";
import * as userValidation from "../../domains/user/user.validation";

const router = express.Router();

router
  .route("/")
  .get(
    authJwt(["read:users"]),
    validateRequest(userValidation.getUsers),
    userController.getUsers
  )
  .post(
    authJwt(["create:users"]),
    validateRequest(userValidation.createUser),
    userController.createUser
  );

router
  .route("/:userId")
  .get(
    authJwt(["update:users"]),
    validateRequest(userValidation.getUser),
    userController.getUser
  )
  .patch(
    authJwt(["update:users"]),
    validateRequest(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    authJwt(["delete:users"]),
    validateRequest(userValidation.deleteUser),
    userController.deleteUser
  );

export default router;
