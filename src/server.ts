import { Server } from "http";
import app from "./app";
import { errorlogger, logger } from "./shared/logger";
import mongoose from "mongoose";
import config from "./config";

let server: Server;
const port = process.env.PORT;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    logger.info("Connected to database");

    server = app.listen(port, () => {
      console.log(`app is running on port ${port}`);
      logger.info(`app is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
    errorlogger.error(err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`unhandleRejection is detected , shutting down...`, err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(`uncaughtExpectiong caught , shutting down...`, err);
  process.exit(1);
});
