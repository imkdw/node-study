import { signUpParams } from "../types/auth.interface";
import connection from "../db";
import { MysqlError, OkPacket } from "mysql";
import { resolve } from "path";

class AuthModel {
  static signUp = async (newUser: signUpParams) => {
    return new Promise((resolve, reject) => {
      const { name, email, password, profile } = newUser;
      const query =
        "INSERT INTO users(name, email, hashed_password, profile) VALUES(?, ?, ?, ?)";

      connection.query(
        query,
        [name, email, password, profile],
        (err: MysqlError, result: OkPacket) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        }
      );
    });
  };

  static searchUser = async (lastRowId: number) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT id, name, email, profile FROM users WHERE id=?";

      connection.query(query, [lastRowId], (err: MysqlError, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  };

  static signIn = async (email: string, password: string) => {};
  static getPassword = async (email: string) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT hashed_password FROM users WHERE email=?";
      connection.query(query, [email], (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  };
}

export default AuthModel;
