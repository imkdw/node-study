import express, { Request, Response } from "express";
import UserRouter from "./routes/user";
import IndexRouter from "./routes/index";
import morgan from "morgan";

const app = express();
app.set("port", 5000);

app.use(morgan("dev"));
app.use("/", IndexRouter);
app.use("/user", UserRouter);

app.use((req: Request, res: Response, next) => {
  res.status(404).send("Not Found");
});

app.listen(app.get("port"), () => {
  console.log(`Server Running On ${app.get("port")}`);
});
