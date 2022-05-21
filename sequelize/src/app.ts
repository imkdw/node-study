import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 5000);
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

app.listen(app.get("port"), () => {
  console.log(`Server is ${app.get("port")}`);
});
