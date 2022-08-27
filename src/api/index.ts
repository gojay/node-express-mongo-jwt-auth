import { Router } from "express";

import symmetricRouter from "./symmetric";
import asymmetricRouter from "./asymmetric";
import userRouter from "./user";
import productRouter from "./product";

const apiRouter = Router();

apiRouter.use("/symmetric", symmetricRouter);
apiRouter.use("/asymmetric", asymmetricRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/products", productRouter);

export default apiRouter;
