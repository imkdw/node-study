import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import multer from "multer";
import { v4 as uuid4 } from "uuid";

import feedRouter from "./routes/feed";
import path from "path";

const app = express();

/** multer에서 사용할 스토리지 */
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid4()}-${file.originalname}`);
  },
});

/** multer에서 사용할 파일 확장자 필터 */
const fileFilter = (req, file, cb) => {
  const mimetype = file.mimetype;
  if (mimetype === "image/png" || mimetype === "image/jpg" || mimetype === "image/jpeg") {
    cb(null, true);
  }

  cb(null, false);
};

/** 미들웨어 설정 */
app.use(express.json());
app.use(morgan("dev"));
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));

/** Static 폴더 설정 */
app.use("/images", express.static(path.join(__dirname, "..", "images")));

/** CORS 대비 헤더 설정 미들웨어 */
app.use((req, res, next) => {
  /** 엑세스를 허용할 모든 url 지정, * 또는 특정 url을 기입 */
  res.setHeader("Access-Control-Allow-Origin", "*");

  /** 외부에서 HTTP 프로토콜로 데이터에 엑세스가 가능하도록 설정 */
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");

  /** 클라이언트 측에서 요청에 설정할수 있는 헤더 지정
   * Content-Type과 Authorization은 필수로 추가
   */
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

/** 에러 핸들링 미들웨어 */
app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

/** 라우터 설정 */
app.use("/feed", feedRouter);

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then((result) => {
    app.listen(5000, () => {
      console.log(`PORT : 5000`);
    });
  })
  .catch((err) => console.error(err));
