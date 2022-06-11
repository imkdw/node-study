// import express from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import db from "../db";
// import { createToken, decodedToken } from "../modules/jwt";
// dotenv.config();
// const userRouter = express.Router();
// /**
//  * [POST] /user/info
//  */
// userRouter.post("/info", async (req, res, next) => {
//   const { accessToken } = req.body;
//   /** 로그인 여부 검증 */
//   if (accessToken === "") {
//     res.status(401).send({
//       errMsg: "로그인이 필요한 기능입니다.",
//     });
//     return;
//   }
//   try {
//     const decoded = await decodedToken(accessToken);
//     db.query(
//       `SELECT * from users where userId="${decoded.userId}"`,
//       (err: any, results) => {
//         if (err) {
//           throw err;
//         }
//         const { userId, name, email } = results[0];
//         res.status(200).send({
//           userId,
//           name,
//           email,
//         });
//       }
//     );
//   } catch (err: any) {
//     if (err.message === "jwt expired") {
//       res.status(401).send({
//         errMsg: "Expired Token",
//       });
//     } else {
//       res.status(401).send({
//         errMsg: "Invalid Token",
//       });
//     }
//   }
// });
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
// export default userRouter;
//# sourceMappingURL=user.js.map