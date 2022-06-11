import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../db";
import { UserSerive } from "../services/UserService";

dotenv.config();

const userRouter = express.Router();

/**
 * [POST] /user/info
 */
userRouter.post("/info", async (req, res, next) => {
  const userDTO = req.body;
  console.log(userDTO);
  const userRecord = await UserSerive.getInfo(userDTO);
  res.status(200).send(":");
});

// userRouter.put("/info", async (req, res) => {
//   const { userId } = await decodedToken(
//     JSON.parse(req.body.accessToken).accessToken
//   );
//   const { name, email } = req.body;
//   const updateQuery = `UPDATE users SET name="${name}", email="${email}" where userId="${userId}"`;

//   db.query(updateQuery, (err: any, results) => {
//     if (err) {
//       throw err;
//     }

//     res.status(200).send();
//   });
// });

// userRouter.delete("/", async (req, res) => {
//   const { userId } = await decodedToken(
//     JSON.parse(req.body.accessToken).accessToken
//   );
//   const deleteQuery = `DELETE FROM users where userId="${userId}"`;
//   db.query(deleteQuery, (err: any) => {
//     if (err) {
//       throw err;
//     }

//     res.status(200).send();
//   });
// });

export default userRouter;
