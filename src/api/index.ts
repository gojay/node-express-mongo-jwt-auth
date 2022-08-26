import { Router } from "express";

import symmetricRouter from "./symmetric";
import asymmetricRouter from "./asymmetric";
import userRouter from "./user";

const apiRouter = Router();

apiRouter.use("/symmetric", symmetricRouter);
apiRouter.use("/asymmetric", asymmetricRouter);
apiRouter.use("/users", userRouter);

export default apiRouter;
