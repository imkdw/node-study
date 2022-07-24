import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import methodOverride from "method-override";
import cors from "cors";

/** 라우터 모듈 */

/** .env 파일 활성화 */
dotenv.config();

const app = express();
app.set("port", process.env.PORT || 3000);

/** 미들웨어 정의 */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cors());

/** 라우터 정의 */

/** 템플릿 엔진 설정 */
app.listen(app.get("port"), () => {
  console.log(`Server Port : ${app.get("port")}`);
});
