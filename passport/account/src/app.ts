import express from "express";
import indexRouter from "./routes";
import authRouter from "./routes/auth";
import path from "path";
import nunjucks from "nunjucks";
import morgan from "morgan";
import { db } from "./db";

const app = express();
app.set("port", 3000);
app.set("view engine", "html");
nunjucks.configure({
  express: app,
  watch: true,
});

db.connect();

app.use(express.static(path.join(__dirname, "../views")));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/", authRouter);

app.listen(app.get("port"), () => {
  console.log(`Server on ${app.get("port")}`);
});
