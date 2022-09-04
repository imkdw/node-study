import express from "express";
import AuthController from "../controllers/auth";

const authRouter = express.Router();

authRouter.get("/login", AuthController.getLogin);
authRouter.post("/login", AuthController.postLogin);

export default authRouter;
