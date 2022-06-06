import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db";
import dotenv from "dotenv";
import { createToken } from "../modules/jwt";

dotenv.config();

const authRouter = express.Router();

const errMsgs = {
  PASSWORD_NOT_MATCH: "비밀번호가 동일하지 않습니다.",
  ACCOUNT_NOT_MATCH: "아이디 또는 비밀번호가 올바르지 않습니다,",
  EXIST_USER: "이미 존재하는 사용자 입니다.",
};

/**
 * [POST] /auth/register
 */
authRouter.post("/register", async (req, res, next) => {
  const { userId, password, rePassword, name, email } = req.body;

  /** 패스워드 일치여부 검사 로직 */
  if (password !== rePassword) {
    res.status(401).send({
      errCode: "PASSWORD_NOT_MATCH",
      errMsg: "패스워드가 동일하지 않습니다.",
    });
    return;
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      const registerQuery = `INSERT INTO users(userId, password, name, email) value ('${userId}', '${hash}', '${name}', '${email}')`;
      db.query(registerQuery, (err: any, results) => {
        if (err) {
          /** 이미 존재하는 사용자 검증 */
          if (err.code === "ER_DUP_ENTRY") {
            res.status(401).send({
              errCode: "EXIST_USER",
              errMsg: "이미 존재하는 사용자 입니다.",
            });

            return;
          }
        }

        console.log(`[회원가입] ${userId}님 회원가입 완료`);
        res.status(200).send();
      });
    });
  });
});

/**
 * [GET] /auth/login
 */
authRouter.post("/login", (req, res, next) => {
  const { userId, password } = req.body;

  /** 공백 입력 검증 */
  if (userId.length === 0 || password.length === 0) {
    res.status(401).send({
      errCode: "ACCOUNT_NOT_MATCH",
      errMsg: "아이디 또는 비밀번호가 올바르지 않습니다.",
    });

    return;
  }

  const loginQuery = `SELECT * from users where userId="${userId}"`;
  db.query(loginQuery, async (err: any, results) => {
    if (err) {
      throw err;
    }

    /** 로그인한 유저가 존재하는지 검증 */
    if (Object.keys(results).length === 0) {
      res.status(401).send({
        errCode: "ACCOUNT_NOT_MATCH",
        errMsg: "아이디 또는 비밀번호가 올바르지 않습니다.",
      });

      return;
    }

    const existPassword = results[0].password;
    if (await bcrypt.compare(password, existPassword)) {
      const token = createToken(userId);

      res.status(200).send({ accessToken: token });
    } else {
      res.status(401).send({
        errCode: "ACCOUNT_NOT_MATCH",
        errMsg: "아이디 또는 비밀번호가 올바르지 않습니다.",
      });
    }
  });
});

export default authRouter;
