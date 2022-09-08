import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/user";
import { hash, compare } from "bcryptjs";
import dotenv from "dotenv";
import Mailgun from "mailgun-js";

dotenv.config();

// import nodemailer from "nodemailer";
// const sendgridTransport = require("nodemailer-sendgrid-transport");

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key: process.env.SENDGRID_API_KEY, // SendGrid Api Key
//     },
//   })
// );

const mailgun = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

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
      isAuthenticated: false,
      errorMessage: message,
    };

    res.render("auth/login", contexts);
  }

  static postLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    userModel.findOne({ email }).then((user) => {
      /** 유저가 없는경우 */
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/auth/login");
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
            req.flash("error", "Invalid email or password.");
            return res.redirect("/auth/login");
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
    };

    res.render("auth/signup", contexts);
  }

  static async postSignup(req: Request, res: Response, next: NextFunction) {
    const { email, password, confirmPassword } = req.body;

    userModel
      .findOne({ email })
      .then((result) => {
        if (result) {
          req.flash("error", "E-mail exist already. Please pick a different one");
          return res.redirect("/auth/signup");
        }

        hash(password, 12)
          .then((hashedPassword) => {
            const user = new userModel({ email, password: hashedPassword, cart: { items: [] } });
            user.save();

            res.redirect("/auth/login");

            return mailgun.messages().send(
              {
                from: "Dongwoo Kim <imkdw@kakao.com>",
                to: email,
                subject: "Signup Succeeded",
                text: "Welcome!",
              },
              (err, body) => {
                if (err) {
                  console.error(err);
                }

                console.log(body);
              }
            );

            // return transporter.sendMail({
            //   to: email,
            //   from: "imkdw@kakao.com",
            //   subject: "Signup Succeeded",
            //   html: "<h1>Welcome!</h1>",
            // });
          })
          .catch((err) => console.error(err));
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
}

export default AuthController;
