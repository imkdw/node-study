import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../db";

dotenv.config();

const userRouter = express.Router();

/**
 * [POST] /user/info
 */
userRouter.post("/info", async (req, res, next) => {
  const { accessToken } = req.body;

  /** 로그인 여부 검증 */
  if (accessToken === "") {
    res.status(401).send({
      errMsg: "로그인이 필요한 기능입니다.",
    });

    return;
  }

  try {
    const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    db.query(
      `SELECT * from users where userId="${decoded.userId}"`,
      (err: any, results) => {
        if (err) {
          throw err;
        }
        const { userId, name, email } = results[0];
        res.status(200).send({
          userId,
          name,
          email,
        });
      }
    );
  } catch (err: any) {
    if (err.message === "jwt expired") {
      console.log("Expired Token");
      res.status(401).send({
        errMsg: "Expired Token",
      });
    } else {
      console.log("Invalid Token");
      res.status(401).send({
        errMsg: "Invalid Token",
      });
    }
  }
});

export default userRouter;
