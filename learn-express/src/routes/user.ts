import express, { Request, Response } from "express";

const UserRouter = express.Router();

UserRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello User");
});

UserRouter.get("/:id", (req: Request, res: Response) => {
  console.log(req.ip);
  res.send(`Welcome User ${req.params.id}, Your ip : ${req.ip}`);
});

export default UserRouter;
