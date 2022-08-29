/**
 * @swagger
 * tags:
 *   name: Seed
 *   description: Init data
 */
import express from "express";
import * as seedController from "domains/seed/seed.controller";

const router = express.Router();

/**
 * @swagger
 * /seed/users:
 *   post:
 *     summary: Seed users
 *     description: seed users, roles and resources
 *     tags: [Seed]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Success
 */
router.post("/users", seedController.seedUsers);

export default router;
