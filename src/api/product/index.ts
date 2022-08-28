import express from "express";
import { authJwt, validateRequest } from "middlewares";
import * as productController from "./product.controller";
import * as productValidation from "./product.validation";

const router = express.Router();

router
  .route("/")
  .get(
    authJwt(["read:products"]),
    validateRequest(productValidation.getProducts),
    productController.getProducts
  )
  .post(
    authJwt(["create:products"]),
    validateRequest(productValidation.createProduct),
    productController.createProduct
  );

router
  .route("/:productId")
  .get(
    authJwt(["read:products"]),
    validateRequest(productValidation.getProduct),
    productController.getProduct
  )
  .patch(
    authJwt(["update:products"]),
    validateRequest(productValidation.updateProduct),
    productController.updateProduct
  )
  .delete(
    authJwt(["delete:products"]),
    validateRequest(productValidation.deleteProduct),
    productController.deleteProduct
  );

export default router;
