import { registerParams } from "../types/auth.interface";
import db from "../db";

export class UserModel {
  static async insertUser(userDTO: registerParams) {
    const insertQuery = `INSERT INTO users("userId", "password", "name", "email") VALUE()`;
    db.query;
  }
}
