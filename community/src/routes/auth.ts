import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db";

/** 기존에 존재하는 아이디인지 검사 */
async function checkExistUserId(userId: string) {
  const checkIdQuery = `SELECT * from users where userId="${userId}"`;
  const data = await db.query(checkIdQuery);
  console.log(data);
}

const authRouter = express.Router();

/**
 * [POST] /register
 */
authRouter.post("/register", async (req, res, next) => {
  const { userId, password, rePassword } = req.body;

  /** 패스워드 일치여부 검사 로직 */
  if (password !== rePassword) {
    res.status(401);
    return;
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      const registerQuery = `INSERT INTO users(userId, password) value ('${userId}', '${hash}')`;
      db.query(registerQuery, (err: any, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            console.log(`${userId}는 이미 존재하는 계정입니다.`);
            res.status(401).json({
              errCode: "EXIST_USER",
              errMsg: "이미 존재하는 사용자 입니다.",
            });
            return;
          }
        }

        console.log("가입완료");
      });
    });
  });
});

export default authRouter;
