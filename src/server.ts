import { Server } from "http";
import app from "./app";
import { errorlogger, logger } from "./shared/logger";

let server: Server;
const port = 3001;

async function main() {
  try {
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
