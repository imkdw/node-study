import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRouter from "./route/authRouter";
import tweetRouter from "./route/tweetRouter";
import userRouter from "./route/userRouter";

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 5000);

/** 미들웨어 정의 */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** 전역변수 정의 */
app.locals.idCount = 1;
app.locals.users = {};
app.locals.tweets = {};

/** 라우터 정의 */
app.use("/auth", authRouter);
app.use("/tweet", tweetRouter);
app.use("/user", userRouter);

app.listen(app.get("port"), () => {
  console.log(`Server Running : PORT : ${app.get("port")}`);
});
