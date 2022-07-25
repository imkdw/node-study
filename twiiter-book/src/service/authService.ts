import { OkPacket } from "mysql";
import AuthModel from "../model/authModel";
import { signUpParams } from "../types/auth.interface";

class AuthService {
  static signUp = async (newUser: signUpParams) => {
    const newUserRecord = await AuthModel.signUp(newUser);
    return newUserRecord;
  };

  static searchUser = async (lastRowId: number) => {
    const searchUserRecord = await AuthModel.searchUser(lastRowId);
    return searchUserRecord;
  };
}

export default AuthService;
