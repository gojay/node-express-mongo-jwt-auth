import { Router } from "express";

import symmetricRouter from "./symmetric";
import asymmetricRouter from "./asymmetric";

const apiRouter = Router();

apiRouter.use("/symmetric", symmetricRouter);
apiRouter.use("/asymmetric", asymmetricRouter);

export default apiRouter;
