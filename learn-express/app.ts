import express, { Request, Response } from "express";
import path from "path";

/**
 * morgan : req, res에 대한 로그를 출력해주는 모듈. dev, combined, common 등 의 옵션이 있다
 * dotenv : 디렉토리 내 .env 파일을 읽어서 process.env 으로 만들어 주는 모듈
 */
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from 'dotenv'

dotenv.config()
const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public'));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_PARSER,
  cookie: {
    httpOnly: true,
    secure: false
  },
  name: 'session-cookie'
}))

app.use((req: Request, res: Response, next: any) => {
  console.log("모든 요청에 대해서 실행");
});

app.get(
  "/",
  (req: Request, res: Response, next: any) => {
    console.log("GET 요청에서만 사용");
    next();
    res.sendFile(path.join(__dirname, "/index.html"));
  },
  (req, res) => {
    throw new Error("에러는 에러처리 미들웨어로 감");
  }
);

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log("Listening on port : ", app.get("port"));
});
