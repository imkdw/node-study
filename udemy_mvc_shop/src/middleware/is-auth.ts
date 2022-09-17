import { Request, Response, NextFunction } from "express";

export function isAuth(req: Request, res: Response | any, next: NextFunction | any) {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }

  next();
}
