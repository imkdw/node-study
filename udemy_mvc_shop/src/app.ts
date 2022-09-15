import express, { Request } from "express";
import path from "path";
import mongoose from "mongoose";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import morgan from "morgan";
import csurf from "csurf";
import flash from "connect-flash";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import fs from "fs";
import https from "https";

import adminRouter from "./routes/admin";
import shopRouter from "./routes/shop";
import ErrorController from "./controllers/error";
import { userModel } from "./models/user";
import authRouter from "./routes/auth";

const accessLogStream = fs.createWriteStream(path.join(__dirname, "..", "access.log"), {
  flags: "a",
});

dotenv.config();
const app = express();
app.set("port", process.env.PORT);
const mongoDbUrl = "mongodb://localhost:27017/shop";

/** 세션 저장을 위한 몽고스토어 생성 */
const MongoDBStore1 = MongoDBStore(session);
const store = new MongoDBStore1({
  uri: mongoDbUrl,
  collection: "sessions",
});

/** CSRF 설정 */
const csrfProtection = csurf();

/** SSL/TLS 설정을 위한 KEY 설정 */
const privateKey = fs.readFileSync("server.key");
const certificate = fs.readFileSync("server.cert");

/** multer 파일저장소 생성 */
const fileStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "images");
  },
  filename: (req: Request, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

/** multer 파일필터 생성 */
const fileFilter = (req: Request, file, cb) => {
  const mimetype = file.mimetype;
  if (mimetype === "image/png" || mimetype === "image/jpg" || mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/** 뷰 엔진 세팅 - EJS */
app.set("view engine", "ejs");

/** Static 폴더 설정 */
app.set("views", path.join(__dirname, "..", "src", "views"));
app.use("/images", express.static(path.join(__dirname, "..", "images")));
app.use(express.static(path.join(__dirname, "..", "src", "public")));

/** 미들웨어 설정 */
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "i am imkdw", resave: false, saveUninitialized: false, store: store }));
app.use(morgan("dev", { stream: accessLogStream }));
app.use(csrfProtection);
app.use(flash());
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));
app.use(helmet());
app.use(compression());

/** 사용자 검증 미들웨어 */
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

/** 사용자 전역관리 */
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  userModel
    .findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }

      res.locals.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

/** 라우터 설정 */
app.use(shopRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.get("/500", ErrorController.get500);

/** 404 에러 핸들러 */
app.use(ErrorController.get404);

/** 500 에러 핸들러 */
app.use((error, req, res, next) => {
  console.error(error);
  res.redirect("/500");
});

/** MongoDB 연결 및 서버오픈 */
mongoose
  .connect(mongoDbUrl)
  .then((result) => {
    /** https로 서버 오픈시 사용 */
    // https
    //   .createServer(
    //     {
    //       key: privateKey,
    //       cert: certificate,
    //     },
    //     app
    //   )
    //   .listen(process.env.PORT || 3000);
    app.listen(process.env.PORT || 3000, () => {
      console.log("PORT : ", app.get("port"));
    });
  })
  .catch((err) => console.error(err));
