import express, { Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db";
import dotenv from "dotenv";
import { AuthSerive } from "../services/AuthService";

dotenv.config();

const authRouter = express.Router();

function responseError(status: number, msg: string, res: Response) {
  res.status(status).send(JSON.stringify({ msg: msg }));
}

/**
 * [POST] /auth/register
 */
authRouter.post("/register", async (req, res, next) => {
  const userDTO = req.body.data;
  const userRecord = await AuthSerive.register(userDTO);

  /** 에러처리 */
  if (userRecord.msg) {
    responseError(userRecord.status, userRecord.msg, res);
    console.error(userRecord);
    return;
  }

  res.status(200).send(JSON.stringify(userRecord));
});

/**
 * [POST] /auth/login
 */
authRouter.post("/login", async (req, res, next) => {
  const userDTO = req.body.data;
  const userRecord = await AuthSerive.login(userDTO);

  /** 에러처리 */
  if (userRecord.msg) {
    responseError(userRecord.status, userRecord.msg, res);
    console.error(userRecord);
    return;
  }

  res.status(200).send(JSON.stringify({ accessToken: userRecord.accessToken }));
});

export default authRouter;
