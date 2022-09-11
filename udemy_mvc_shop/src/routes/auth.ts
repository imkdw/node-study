import express from "express";
import AuthController from "../controllers/auth";
import { body } from "express-validator";
import { userModel } from "../models/user";

const authRouter = express.Router();

authRouter.get("/login", AuthController.getLogin);

authRouter.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
  AuthController.postLogin
);

authRouter.get("/signup", AuthController.getSignup);

authRouter.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid Email")
      .custom((value) => {
        return userModel.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail Already Use. Please pick different one");
          }
        });
      }),
    body("password", "Please enter a Password with only number and text and at least 5 characters")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password must be match");
      }

      return true;
    }),
  ],
  AuthController.postSignup
);

authRouter.post("/logout", AuthController.postLogout);
authRouter.get("/reset", AuthController.getReset);
authRouter.post("/reset", AuthController.postReset);
authRouter.get("/new-password/:token", AuthController.getNewPassword);
authRouter.post("/new-password", AuthController.postNewPassword);

export default authRouter;
