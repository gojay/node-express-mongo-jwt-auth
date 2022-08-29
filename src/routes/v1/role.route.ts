/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Manage roles
 */
import express from "express";
import { authJwt } from "middlewares";
import * as roleController from "domains/role/role.controller";

const router = express.Router();

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     description: Only users with scope "read:users"  can retrieve all roles.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
router.get("/", authJwt(["read:users"]), roleController.getRoles);

export default router;
