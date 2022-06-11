import { registerParams } from "../types/auth.interface";
import db from "../db";

export class AuthModel {
  static async insertUser(userDTO: registerParams): Promise<string> {
    return new Promise((resolve, reject) => {
      const { userId, password, name, email } = userDTO;
      const sql = `INSERT INTO users(userId, password, name, email) VALUES(?, ?, ?, ?)`;
      db.query(sql, [userId, password, name, email], (err: any, results) => {
        if (err) {
          throw err;
        }

        resolve(userId);
      });
    });
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
