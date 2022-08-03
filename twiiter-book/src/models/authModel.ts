import { selectUserResult, signUpParams } from '../types/auth.interface';
import connection from '../db';
import { MysqlError } from 'mysql';

class AuthModel {
  static signUp = async (newUser: signUpParams): Promise<MysqlError | number> => {
    return new Promise((resolve, reject) => {
      const { name, email, password, profile } = newUser;
      const query = 'INSERT INTO users(name, email, hashed_password, profile) VALUES(?, ?, ?, ?)';

      connection.query(query, [name, email, password, profile], (err, result) => {
        if (err) {
          reject(err);
        }

        if (result) {
          resolve(result.insertId);
        }
      });
    });
  };

  static searchUser = async (userId: number): Promise<MysqlError | selectUserResult> => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, name, email, profile FROM users WHERE id=?';

      connection.query(query, [userId], (err, result) => {
        if (err) {
          reject(err);
        }

        const { name, email, profile } = result[0];
        resolve({ name, email, profile });
      });
    });
  };

  static getPassword = async (email: string): Promise<MysqlError | string> => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT hashed_password FROM users WHERE email=?';
      connection.query(query, [email], (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result[0].hashed_password);
      });
    });
  };

  static getUserId = async (email: string): Promise<MysqlError | string> => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id FROM users WHERE email=?';
      connection.query(query, [email], (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result[0].id);
      });
    });
  };
}

export default AuthModel;
