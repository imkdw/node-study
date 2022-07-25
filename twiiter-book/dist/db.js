"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mysql_1 = __importDefault(require("mysql"));
var connection = mysql_1["default"].createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "twitter_book"
});
exports["default"] = connection;
// export async function insertUser(newUser: insertUserParams) {
//   return new Promise((res, rej) => {
//     const userData = [
//       newUser.name,
//       newUser.email,
//       newUser.password,
//       newUser.profile,
//     ];
//     const query = `INSERT INTO users(name, email, profile, hashed_password) VALUES (?, ?, ?, ?)`;
//     connection.query(query, userData, (err, result) => {
//       if (err) {
//         rej(err);
//       }
//       res(result);
//       console.log(result);
//     });
//   });
// }
//# sourceMappingURL=db.js.map