import express from "express";
import nunjucks from "nunjucks";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import methodOverride from "method-override";

/** 라우터 모듈 */
import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
// import userRouter from "./routes/user";

/** .env 파일 활성화 */
dotenv.config();

const app = express();
app.set("port", process.env.PORT || 3000);

/** 미들웨어 정의 */
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../views")));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

/** 라우터 정의 */
app.use("/", indexRouter);
app.use("/auth", authRouter);
// app.use("/user", userRouter);

/** 템플릿 엔진 설정 */
app.set("view engine", "html");
nunjucks.configure({
  express: app,
  watch: true,
});

app.listen(app.get("port"), () => {
  console.log(`Server Port : ${app.get("port")}`);
});
