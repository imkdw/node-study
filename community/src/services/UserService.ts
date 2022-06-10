import { Secure } from "../modules/secure";
import { registerParams } from "../types/auth.interface";
import { UserModel } from "../models/UserModel";

const errCodes = {
  PASSWORD_NOT_MATCH: "PASSWORD_NOT_MATCH", // 회원가입시 패스워드 불일치
};

export class UserSerive {
  static async register(userDTO: registerParams) {
    const { userId, password, rePassword, name, email } = userDTO;

    /** 비밀번호 일치여부 검사 */
    if (password !== rePassword) {
      return {
        status: 401,
        errCode: errCodes.PASSWORD_NOT_MATCH,
      };
    }

    /** 암호화된 비밀번호 생성 */
    const salt = await Secure.getSalt();
    const hashPassword = await Secure.hash(password, salt);

    /** DB에 INSERT 요청 */
    userDTO.password = hashPassword;
    const UserRecord = await UserModel.insertUser(userDTO);
  }
}
