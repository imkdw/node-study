import exporess, { Request } from "express";
import crypto from "crypto";
import { db } from "../db";

const authRouter = exporess.Router();

authRouter.post("/signup", (req: Request, res, next) => {
  const { username, password } = req.body;
  const signUpQuery = `insert into users(username, password) values ("${username}", "${password}")`;
  console.log(signUpQuery);
  db.query(signUpQuery, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`[Success] ${req.body.username} REGISTERED`);
      res.redirect("/");
    }
  });
});

export default authRouter;
