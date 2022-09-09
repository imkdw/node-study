import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/user";
import { hash, compare } from "bcryptjs";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

dotenv.config();

import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY, // SendGrid Api Key
    },
  })
);

class AuthController {
  static getLogin(req: Request, res: Response, next: NextFunction) {
    let message: string[] | string | null = req.flash("error");

    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }

    const contexts = {
      path: "/auth/login",
      pageTitle: "Login",
      oldInput: { email: "", password: "" },
      errorMessage: message,
      validationErrors: [],
    };

    res.render("auth/login", contexts);
  }

  static postLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const contexts = {
        path: "/auth/login",
        pageTitle: "Login",
        isAuthenticated: false,
        errorMessage: errors.array()[0].msg,
        oldInput: { email, password },
        validationErrors: errors.array(),
      };

      return res.status(422).render("auth/login", contexts);
    }

    userModel.findOne({ email }).then((user) => {
      /** 유저가 없는경우 */
      if (!user) {
        req.flash("error", "Invalid email or password.");

        const contexts = {
          path: "/auth/login",
          pageTitle: "Login",
          isAuthenticated: false,
          errorMessage: req.flash("error"),
          oldInput: { email, password },
          validationErrors: [],
        };

        return res.render("auth/login", contexts);
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
          } else {
            const contexts = {
              path: "/auth/login",
              pageTitle: "Login",
              isAuthenticated: false,
              errorMessage: "Invalid email or password",
              oldInput: { email, password },
              validationErrors: [],
            };

            return res.render("auth/login", contexts);
          }
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
    let message: string[] | string | null = req.flash("error");

    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }

    const contexts = {
      path: "/auth/signup",
      pageTitle: "Signup",
      isAuthenticated: false,
      errorMessage: message,
      oldInput: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationErrors: [],
    };

    res.render("auth/signup", contexts);
  }

  static async postSignup(req: Request, res: Response, next: NextFunction) {
    const { email, password, confirmPassword } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);

      const contexts = {
        path: "/auth/signup",
        pageTitle: "Signup",
        isAuthenticated: false,
        errorMessage: errors.array()[0].msg,
        oldInput: { email, password, confirmPassword },
        validationErrors: errors.array(),
      };

      return res.status(422).render("auth/signup", contexts);
    }

    hash(password, 12)
      .then((hashedPassword) => {
        const user = new userModel({ email, password: hashedPassword, cart: { items: [] } });
        user.save();

        res.redirect("/auth/login");

        return transporter.sendMail({
          to: email,
          from: "imkdw@kakao.com",
          subject: "Signup Succeeded",
          html: "<h1>Welcome!</h1>",
        });
      })
      .catch((err) => console.error(err));
  }

  static getReset(req: Request, res: Response, next: NextFunction) {
    let message: string[] | string | null = req.flash("error");

    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }

    const contexts = {
      path: "/auth/reset",
      pageTitle: "Reset Password",
      errorMessage: message,
    };

    res.render("auth/reset", contexts);
  }

  static postReset(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const token = uuidv4();

    userModel
      .findOne({ email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No Account with that email Found");
          res.redirect("/auth/reset");
        }

        user.resetToken = token;
        user.resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hours
        return user.save();
      })
      .then((result) => {
        res.redirect("/");
        return transporter.sendMail({
          to: email,
          from: "Dongwoo Kim <imkdw@kakao.com>",
          subject: "Password Reset",
          html: `
          <p>Hello! ${email}</p>
          <p>You Request a password Reset</p>
          <p>Click this <a href="http://localhost:3000/auth/new-password/${token}">link</a> to set New Password</p>
        `,
        });
      })
      .catch((err) => console.error(err));
  }

  static getNewPassword(req: Request, res: Response, next: NextFunction) {
    const resetToken = req.params.token;
    userModel
      .findOne({ resetToken, resetTokenExpiration: { $gt: Date.now() } })
      .then((user) => {
        let message: string[] | string | null = req.flash("error");
        if (message.length > 0) {
          message = message[0];
        } else {
          message = null;
        }

        const contexts = {
          path: "/auth/new-password",
          pageTitle: "Reset Password",
          errorMessage: message,
          userId: user._id,
          newPasswordToken: resetToken,
        };

        res.render("auth/new-password", contexts);
      })
      .catch((err) => console.error(err));
  }

  static postNewPassword(req: Request, res: Response, next: NextFunction) {
    const { newPassword, userId, newPasswordToken } = req.body;
    let resetUser;

    userModel
      .findOne({
        resetToken: newPasswordToken,
        resetTokenExpiration: { $gt: Date.now() },
        _id: new ObjectId(userId),
      })
      .then((user) => {
        resetUser = user;
        return hash(newPassword, 12);
      })
      .then((hashedPassword) => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
      })
      .then((result) => res.redirect("/auth/login"))
      .catch((err) => console.error(err));
  }
}

export default AuthController;
