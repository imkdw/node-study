import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db";
import dotenv from "dotenv";
import { AuthSerive } from "../services/AuthService";

dotenv.config();

const authRouter = express.Router();

function getStatusCode() {}

/**
 * [POST] /auth/register
 */
authRouter.post("/register", async (req, res, next) => {
  const userDTO = req.body;
  const userRecord = await AuthSerive.register(userDTO);
  res.status(200).send(JSON.stringify(userRecord));
});

/**
 * [GET] /auth/login
 */
authRouter.post("/login", async (req, res, next) => {
  const userDTO = req.body;
  const userRecord = await AuthSerive.login(userDTO);
  if (userRecord.msg) {
  }
});

export default authRouter;
