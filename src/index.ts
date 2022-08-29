import mongoose from "mongoose";
import app from "./app";

const APP_PORT = process.env.APP_PORT ?? 8080;
const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.info("Connected to MongoDB");
  app.listen(APP_PORT, () => {
    console.log(`Server is running at http://localhost:${APP_PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("Unable to connect MongoDB", err);
});

mongoose.connection.on("reconnected", () => {
  console.info("Reconnected to MongoDB");
});

mongoose.connection.on("disconnected", async () => {
  console.error(`MongoDB disconnected.`);
  process.exit(1);
});
