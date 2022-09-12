import { UserModel } from "./../models/user";
import { AuthController } from "./../controllers/auth";
import express, { Router } from "express";
import { body } from "express-validator";

const authRouter = express.Router();

authRouter.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value) => {
        return UserModel.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-Mail address alreay exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  AuthController.signup
);

authRouter.post("/login", AuthController.login);

export default authRouter;
