import express, { Application, NextFunction, Request, Response } from "express";
import { errorlogger } from "./shared/logger";
import path from "path";
import { LogsRoutes } from "./modules/Logs/logs.routes";
const app: Application = express();
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.send(` <html>
      <head>
        <title>Docker Logs Viewer</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Welcome to the Docker Logs Viewer Page from conatainer and jubair test!</h1>
        <p>Go to <a href="/logs/errors">Error Logs</a> or <a href="/logs/successes">Success Logs</a>.</p>
      </body>
    </html>`);
});

app.get("/error", (req, res) => {
  throw new Error("This is faced Error");
});

app.use("/logs", LogsRoutes);

app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err);
  errorlogger.error(err);

  res.status(500).send(`
    <html>
      <head>
        <title>Error</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Something went wrong</h1>
        <p>${err.message}</p>
        <a href="/">Back to Home</a>
      </body>
    </html>
  `);
});

app.use((req: Request, res: Response) => {
  res.status(400).json({ message: "Not Found" });
});

export default app;
