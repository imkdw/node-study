import { registerParams } from "../types/auth.interface";
import db from "../db";

export class UserModel {
  static async insertUser(userDTO: registerParams) {
    const { userId, password, name, email } = userDTO;
    const insertQuery = `INSERT INTO users("userId", "password", "name", "email") VALUE("${userId}", "${password}", "${name}", "${email}")`;
    db.query(insertQuery, (err: any, results) => {
      console.log(results);
    });
  }
}
