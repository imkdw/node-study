import express from "express";
import AuthController from "../controllers/auth";

const authRouter = express.Router();

authRouter.get("/login", AuthController.getLogin);
authRouter.post("/login", AuthController.postLogin);
authRouter.get("/signup", AuthController.getSignup);
authRouter.post("/signup", AuthController.postSignup);
authRouter.post("/logout", AuthController.postLogout);
authRouter.get("/reset", AuthController.getReset);

export default authRouter;
