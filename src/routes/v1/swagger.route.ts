import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDefinition from "config/swagger.definition";

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["swagger.components.yaml", "build/routes/v1/*.js"],
});

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

export default router;
