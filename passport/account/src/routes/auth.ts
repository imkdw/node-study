import exporess, { Request } from "express";
import crypto from "crypto";
import passport from "passport";
import { db } from "../db";

const authRouter = exporess.Router();

authRouter.post("/signup", (req: Request, res, next) => {
  const { username, password } = req.body;
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, hashedPassword) => {
    if (err) {
      next(err);
    }

    const signUpQuery = `insert into users(username, password) values ("${username}", "${hashedPassword}")`;
    db.query(signUpQuery, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`[Success] ${req.body.username} REGISTERED`);
        res.redirect("/");
      }
    });
  });
});

authRouter.post("/login", (req, res, next) => {
  con;
});

export default authRouter;
