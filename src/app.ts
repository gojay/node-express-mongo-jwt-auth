import "dotenv/config";

import path from "path";
import express from "express";
import bodyParser from "body-parser";

import { ErrorHandlerMiddleware } from "middlewares";
import api from "./api";
import auth from "./auth";

const app = express();

app.use(bodyParser.json());
app.use("/.well-known", express.static(path.join(__dirname, "../jwk/public")));
app.use("/auth", auth);
app.use("/api", api);
app.use(ErrorHandlerMiddleware);

export default app;
