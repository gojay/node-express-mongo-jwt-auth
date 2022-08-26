import "dotenv/config";

import path from "path";
import express from "express";
import bodyParser from "body-parser";

import { ErrorHandlerMiddleware } from "middlewares";
import api from "./api";

const app = express();

app.use(express.static(path.join(__dirname + "/../")));
app.use(bodyParser.json());
app.use("/api", api);
app.use(ErrorHandlerMiddleware);

export default app;
