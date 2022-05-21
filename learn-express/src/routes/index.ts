import express, { Request, Response } from "express";

const IndexRouter = express.Router();

IndexRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello Index");
});

export default IndexRouter;
