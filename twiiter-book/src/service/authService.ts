import { MysqlError } from 'mysql';
import AuthModel from '../models/authModel';
import Jwt from '../module/jwt';
import Secure from '../module/secure';
import { selectUserResult, signUpParams } from '../types/auth.interface';

class AuthService {
  static async signUp(newUser: signUpParams): Promise<MysqlError | selectUserResult> {
    newUser.password = await Secure.hash(newUser.password);
    try {
      const userId = await AuthModel.signUp(newUser);
      if (typeof userId === 'number') {
        const userRecord = await AuthModel.searchUser(userId);
        return userRecord;
      }
    } catch (err) {
      return err;
    }
  }

  static searchUser = async (lastRowId: number) => {
    const searchUserRecord = await AuthModel.searchUser(lastRowId);
    return searchUserRecord;
  };

  static signIn = async (email: string, password: string): Promise<MysqlError | string> => {
    try {
      const hashedPassword = await AuthModel.getPassword(email);
      if (typeof hashedPassword === 'string') {
        const compare = await Secure.comparePassword(password, hashedPassword);

        if (!compare) {
          return;
        }

        const accessToken = Jwt.createToken(email);
        return accessToken;
      }
    } catch (err) {
      return err;
    }
  };

  static getUserId = async (email: string): Promise<MysqlError | string> => {
    const userIdRecord: MysqlError | string = await AuthModel.getUserId(email);
    return userIdRecord;
  };
}

export default AuthService;
