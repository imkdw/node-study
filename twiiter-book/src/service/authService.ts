import AuthModel from "../models/authModel";
import Jwt from "../module/jwt";
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
      const passwordRecord = await AuthModel.getPassword(email);
      const hashedPassword = passwordRecord[0].hashed_password;
      if (await Secure.comparePassword(password, hashedPassword)) {
        const accessToken = Jwt.createToken(email);
        return accessToken;
      }
    } catch (err) {
      console.error(err);
      return err;
    }
  };
}

export default AuthService;
