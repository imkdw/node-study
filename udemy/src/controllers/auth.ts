import { NextFunction, Request, Response } from "express";

class AuthController {
  static getLogin(req: Request, res: Response, next: NextFunction) {
    console.log(req.session.isLoggedIn);

    const contexts = {
      path: "/auth/login",
      pageTitle: "Login",
      isAuthenticated: false,
    };

    res.render("auth/login", contexts);
  }

  static postLogin(req: Request, res: Response, next: NextFunction) {
    req.session.isLoggedIn = true;
    res.redirect("/");
  }

  static postLogout(req: Request, res: Response, next: NextFunction) {
    req.session.destroy((err) => {
      console.log(err);
      res.redirect("/");
    });
  }
}

export default AuthController;
