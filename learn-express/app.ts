import express, { Request, Response } from "express";
import path from "path";

const app = express();

// 서버가 실행될 포트를 지정
// process.env에 포트가 없다면 기본값은 3000번
app.set("port", process.env.PORT || 3000);

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
