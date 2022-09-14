import { clearImage } from "./controllers/feed";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { v4 as uuid4 } from "uuid";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { isAuth } from "./middleware/is-auth";

import feedRouter from "./routes/feed";
import authRouter from "./routes/auth";

import { graphqlSchema } from "./graphql/schema";
import { GraphqlResolver } from "./graphql/resolvers";

export const app = express();

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
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));
app.use(cors());

/** Static 폴더 설정 */
app.use("/images", express.static(path.join(__dirname, "..", "images")));

/** CORS 대비 헤더 설정 미들웨어 */
app.use((req, res, next) => {
  /** 엑세스를 허용할 모든 url 지정, * 또는 특정 url을 기입 */
  res.setHeader("Access-Control-Allow-Origin", "*");

  /** 외부에서 HTTP 프로토콜로 데이터에 엑세스가 가능하도록 설정 */
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");

  /** 클라이언트 측에서 요청에 설정할수 있는 헤더 지정
   * Content-Type과 Authorization은 필수로 추가
   */
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.put("post-image", (req, res, next) => {
  if (!isAuth) {
    throw new Error("Not authenticate");
  }
  /** 파일이 존재하지 않을경우 메세지 리턴 */
  if (!req.file) {
    return res.status(200).send({ message: "no file provided" });
  }

  /** 기존 업로드된 이미지 삭제 */
  if (req.body.oldPath) {
    clearImage(req.body.oldPath);
  }

  return res.status(201).json({ message: "File Stored", filePath: req.file.path });
});

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: GraphqlResolver,
    graphiql: true,
    customFormatErrorFn(err: any) {
      /**
       * err.originalError
       * 1. express-graphql이 사용자나 제3자의 오류를 감지했을때 설정
       * 2. 글자누락 등 기술적인 오류가 생긴 경우는 오류가 생성되지 않음
       */
      if (!err.originalError) {
        /** 기술적인 오류가 생긴 경우 graphql로 생성된 오류 반환 */
        return err;
      }

      const data = err.originalError.data;
      const message = err.message || "An error Occurred.";
      const code = err.originalError.code || 500;
      return { data, message, code };
    },
  })
);

/** 에러 핸들링 미들웨어 */
app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

/** 라우터 설정 */
app.use("/feed", feedRouter);
app.use("/auth", authRouter);

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then((result) => {
    app.listen(5000, () => {
      console.log("Server Running on 5000");
    });
  })
  .catch((err) => console.error(err));
