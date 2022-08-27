import express from "express";
import { validateRequest } from "middlewares";
import * as productController from "./product.controller";
import * as productValidation from "./product.validation";

const router = express.Router();

router
  .route("/")
  .get(
    validateRequest(productValidation.getProducts),
    productController.getProducts
  )
  .post(
    validateRequest(productValidation.createProduct),
    productController.createProduct
  );

router
  .route("/:productId")
  .get(
    validateRequest(productValidation.getProduct),
    productController.getProduct
  )
  .patch(
    validateRequest(productValidation.updateProduct),
    productController.updateProduct
  )
  .delete(
    validateRequest(productValidation.deleteProduct),
    productController.deleteProduct
  );

export default router;
