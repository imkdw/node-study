import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "twitter_book",
});

export default connection;

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
