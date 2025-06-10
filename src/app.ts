import express, { Application, NextFunction, Request, Response } from "express";
import { errorlogger } from "./shared/logger";
import path from "path";
import cors from "cors";
import { LogsRoutes } from "./modules/Logs/logs.routes";
import router from "./routes";
const app: Application = express();
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/api/v1", router);

app.get("/todos", async (req: Request, res: Response) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  // const response = await fetch("http://ts-docker-container:5000/api/v1/users");
  const todos = await response.json();
  res.status(200).json(todos);
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
