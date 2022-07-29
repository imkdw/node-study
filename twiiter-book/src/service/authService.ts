import AuthModel from "../models/authModel";
import Secure from "../module/secure";
import { signUpParams } from "../types/auth.interface";

class AuthService {
  static signUp = async (newUser: signUpParams) => {
    newUser.password = await Secure.hash(newUser.password);
    const newUserRecord = await AuthModel.signUp(newUser);
    return newUserRecord;
  };

  static searchUser = async (lastRowId: number) => {
    const searchUserRecord = await AuthModel.searchUser(lastRowId);
    return searchUserRecord;
  };

  static signIn = async (email: string, password: string) => {
    try {
      const hashedPassword = await AuthModel.getPassword(email);
    } catch (err) {
      console.error(err);
      return err;
    }
  };
}

export default AuthService;
