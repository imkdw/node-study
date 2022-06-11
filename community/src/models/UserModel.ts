import db from "../db";

export class UserModel {
  static async searchUser(userId: string) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users where userId="?"`;
      db.query(sql, [userId], (err: any, results) => {
        if (err) {
          throw err;
        }

        resolve(results[0]);
      });
    });
  }
}
