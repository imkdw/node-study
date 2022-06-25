import { getPasswordReturn, registerParams } from "../types/auth.interface";
import db from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export class AuthModel {
  static async insertUser(userDTO: registerParams) {
    return new Promise((resolve, reject) => {
      const { userId, password, nickname, email } = userDTO;
      const sql = `INSERT INTO users(userId, password, nickname, email) VALUES(?, ?, ?, ?)`;
      db.query(
        sql,
        [userId, password, nickname, email],
        (err: any, results) => {
          if (err) {
            reject(err);
          }

          resolve({ userId, nickname, email });
        }
      );
    });
  }

  static async getPassword(userId: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users where userId=?`;
      const query = db.query(sql, [userId], (err: any, results) => {
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  }
}
