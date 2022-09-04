import { NextFunction, Request, Response } from "express";

class AuthController {
  static getLogin(req: Request, res: Response, next: NextFunction) {
    const isLoggedIn = req.get("Cookie").split("=")[1];

    const contexts = {
      path: "/auth/login",
      pageTitle: "Login",
      isAuthenticated: isLoggedIn,
    };

    res.render("auth/login", contexts);
  }

  static postLogin(req: Request, res: Response, next: NextFunction) {
    // * outgoingMessage.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);
    res.setHeader("Set-Cookie", ["loggedIn=true"]);
    res.redirect("/");
  }
}

export default AuthController;
