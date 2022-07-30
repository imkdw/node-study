import { NextFunction, Request, Response } from "express";
import Jwt from "../module/jwt";

export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.body.accessToken;
  if (Jwt.verifyToken(accessToken)) {
    console.log("Valid Token");
  } else {
    res.send(401).send("인증되지 않은 유저입니다.");
  }
  next();
};
