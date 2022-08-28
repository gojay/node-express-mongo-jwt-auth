import { Router } from "express";

import swaggerRoute from "./swagger.route";
import asymmetricRouter from "./jwk-asymmetric.route";
import symmetricRouter from "./jwk-symmetric.route";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import productRouter from "./product.route";

const apiRouter = Router();

apiRouter.use("/docs", swaggerRoute);
apiRouter.use("/jwk/asymmetric", asymmetricRouter);
apiRouter.use("/jwk/symmetric", symmetricRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/products", productRouter);

export default apiRouter;
