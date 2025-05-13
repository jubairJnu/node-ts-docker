import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();

app.get("/", (req, res) => {
  res.send("welcome to  express with typescript docker with next level!");
});

app.get("/error", (req, res) => {
  throw new Error("This is faced Error");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({ message: err });
});

app.use((req: Request, res: Response) => {
  res.status(400).json({ message: "Not Found" });
});

export default app;
