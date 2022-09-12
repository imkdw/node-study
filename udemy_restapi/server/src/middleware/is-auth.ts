import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");

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
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error: any = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }

  // res.locals.userId = decodedToken.userId;
  req.app.set("userId", decodedToken.userId);

  next();
};
