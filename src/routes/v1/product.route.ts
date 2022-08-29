/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Manage product
 */
import express from "express";
import { authJwt, validateRequest } from "middlewares";
import * as productController from "../../domains/product/product.controller";
import * as productValidation from "../../domains/product/product.validation";

const router = express.Router();
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a product
 *     description: Only products with scope "update:products" can create other products.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - sku
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               sku:
 *                 type: string
 *                 description: must be unique
 *               price:
 *                  type: number
 *             example:
 *               name: Product 1
 *               sku: sku0001
 *               price: 500000
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all products
 *     description: Only products with scope "read:products"  can retrieve all products.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 *       "400":
 *         $ref: '#/components/responses/DuplicateSku'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
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
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product
 *     description: Only products with scope "read:products", can fetch other products.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a product
 *     description: Only products with scope "update:products", can update other products.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               sku:
 *                 type: string
 *                 description: must be unique
 *               price:
 *                  type: number
 *             example:
 *               name: Product 1
 *               sku: sku0001
 *               price: 100000
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       "400":
 *         $ref: '#/components/responses/DuplicateSku'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a product
 *     description: Only products with scope "delete:products" can delete other products.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
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
