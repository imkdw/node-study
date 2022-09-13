import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");

  /** 헤더에 인증관련 정보가 없을경우 */
  if (!authHeader) {
    req.app.set("isAuth", false);
    return next();
  }

  if (!authHeader) {
    const error: any = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }

  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "thisismyjwtsecretkey");
  } catch (err) {
    req.app.set("isAuth", false);
    return next();
  }

  if (!decodedToken) {
    req.app.set("isAuth", false);
    return next();
  }

  // res.locals.userId = decodedToken.userId;
  req.app.set("userId", decodedToken.userId);
  req.app.set("isAuth", true);

  next();
};
