import { registerParams, registerReturns } from "../types/auth.interface";
import db from "../db";

export class UserModel {
  static async insertUser(userDTO: registerParams): Promise<registerReturns> {
    const { userId, password, name, email } = userDTO;
    const insertQuery = `INSERT INTO users(userId, password, name, email) VALUES(?, ?, ?, ?)`;
    db.query(
      insertQuery,
      [userId, password, name, email],
      (err: any, results) => {
        if (err) {
          throw err;
        }

        console.log(`[회원가입] ${userId}님 회원가입 성공`);
      }
    );

    return { userId, name, email };
  }

  static async getPassword(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users where userId=?`;
      const query = db.query(sql, [userId], (err: any, results) => {
        if (err) {
          reject(err);
        }

        resolve(results[0].password);
      });
    });
  }
}
