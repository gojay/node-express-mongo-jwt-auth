import { Router } from "express";

import swaggerRoute from "./swagger.route";
import asymmetricRouter from "./jwk-asymmetric.route";
import symmetricRouter from "./jwk-symmetric.route";
import authRouter from "./auth.route";
import roleRouter from "./role.route";
import userRouter from "./user.route";
import productRouter from "./product.route";
import seedRouter from "./seed.route";

const apiRouter = Router();

apiRouter.use("/docs", swaggerRoute);

apiRouter.use("/jwk/asymmetric", asymmetricRouter);
apiRouter.use("/jwk/symmetric", symmetricRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/roles", roleRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/seed", seedRouter);

export default apiRouter;
