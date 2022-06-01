import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db";

/** 기존에 존재하는 아이디인지 검사 */
function checkExistUserId(userId: string): number | void {
  const checkIdQuery = `SELECT * from users where userId="${userId}"`;
  db.query(checkIdQuery, (err: any, results, fields) => {
    return "sex";
  });
}

const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
  const { userId, password, rePassword } = req.body;

  /** 패스워드 일치여부 검사 로직 */
  if (password !== rePassword) {
    res.status(401);
    return;
  }

  db.connect();
  const temp = checkExistUserId(userId);
  console.log(temp);

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      const registerQuery = `INSERT IGNORE INTO users(userId, password) value ('${userId}', '${hash}')`;
      db.query(registerQuery, (err: any, results, fields) => {
        if (err) {
          console.error(err);
        }

        console.log(`[성공] ${userId}님 회원가입 완료`);
        db.end();
      });
    });
  });
});

export default authRouter;
