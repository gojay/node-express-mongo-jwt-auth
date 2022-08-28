import "dotenv/config";

import path from "path";
import express from "express";
import bodyParser from "body-parser";

import { ErrorHandlerMiddleware } from "middlewares";

import v1 from "./routes/v1";

const app = express();

app.use(bodyParser.json());
app.use("/.well-known", express.static(path.join(__dirname, "../jwk/public")));
app.use("/v1", v1);
app.use(ErrorHandlerMiddleware);

export default app;
