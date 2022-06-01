import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db";

const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
  const { userId, password, rePassword } = req.body;

  if (password !== rePassword) {
    res.status(401);
    return;
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      const registerQuery = `INSERT INTO users(userId, password) value ('${userId}', '${hash}')`;
    });
  });
});

export default authRouter;
