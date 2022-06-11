import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db";
import dotenv from "dotenv";
import { UserSerive } from "../services/UserService";

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
  const userDTO = req.body;
  const userRecord = await UserSerive.register(userDTO);
  res.status(200).send(JSON.stringify(userRecord));
});

/**
 * [GET] /auth/login
 */
authRouter.post("/login", async (req, res, next) => {
  const userDTO = req.body;
  const userRecord = await UserSerive.login(userDTO);
  if (userRecord.status === 200) {
    res.status(userRecord.status).send(JSON.stringify(userRecord.accessToken));
  } else {
    res.status(userRecord.status).send(JSON.stringify(userRecord.msg));
  }
});

export default authRouter;
