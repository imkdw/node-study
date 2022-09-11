import { Request, Response, NextFunction } from "express";

export function isAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }

  next();
}
