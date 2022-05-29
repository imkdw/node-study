import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { isLoggedIn, isNotLoggedIn } from "./middlewares";
import { User } from "../../models";

export const AuthRouter = express.Router();

AuthRouter.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

AuthRouter.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      return res.redirect(`?loginError=${info.message}`);
    }

    return req.logIn(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

AuthRouter.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy;
  res.redirect("/");
});
