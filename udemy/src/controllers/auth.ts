import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/user";
import { hash, compare } from "bcryptjs";

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
    const { email, password } = req.body;

    userModel.findOne({ email }).then((user) => {
      /** 유저가 없는경우 */
      if (!user) {
        return res.redirect("/login");
      }

      compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.error(err);
              res.redirect("/");
            });
          }

          res.redirect("/auth/login");
        })
        .catch((err) => console.error(err));
    });
  }

  static postLogout(req: Request, res: Response, next: NextFunction) {
    req.session.destroy((err) => {
      console.log(err);
      res.redirect("/");
    });
  }

  static getSignup(req: Request, res: Response, next: NextFunction) {
    const contexts = {
      path: "/auth/signup",
      pageTitle: "Signup",
      isAuthenticated: false,
    };

    res.render("auth/signup", contexts);
  }

  static async postSignup(req: Request, res: Response, next: NextFunction) {
    const { email, password, confirmPassword } = req.body;
    console.log(email, password, confirmPassword);

    userModel
      .findOne({ email })
      .then((result) => {
        if (result) {
          return res.redirect("/auth/signup");
        }

        hash(password, 12)
          .then((hashedPassword) => {
            const user = new userModel({ email, password: hashedPassword, cart: { items: [] } });
            user.save();
            return res.redirect("/auth/login");
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }
}

export default AuthController;
