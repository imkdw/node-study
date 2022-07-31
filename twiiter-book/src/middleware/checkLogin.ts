import { NextFunction, Request, Response } from "express";
import Jwt from "../module/jwt";
import AuthService from "../service/authService";

export const checkLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.body.accessToken;
  try {
    const verify = Jwt.verifyToken(accessToken);

    // 비허가 유저일 경우
    if (!verify) {
      res.status(401).send("비정상적인 토큰입니다.");
    }

    const decodedToken: any = Jwt.decodeToken(accessToken);
    const email = decodedToken.email;
    const userId = await AuthService.getUserId(email);
    res.locals.userId = userId;
    next();
  } catch (err) {
    res.status(401).send("토큰 인증 오류입니다.");
  }
};
