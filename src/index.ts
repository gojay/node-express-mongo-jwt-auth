import "dotenv/config";

import path from "path";
import express from "express";
import bodyParser from "body-parser";

import { ErrorHandlerMiddleware } from "middlewares";
import api from "./api";

export const APP_PORT = process.env.APP_PORT ?? 8080;

const app = express();

app.use(express.static(path.join(__dirname + "/../")));
app.use(bodyParser.json());
app.use("/api", api);
app.use(ErrorHandlerMiddleware);

app.listen(APP_PORT, () => {
  console.log(`Server is running at http://localhost:${APP_PORT}`);
});
