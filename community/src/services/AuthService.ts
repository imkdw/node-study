import { Secure } from "../modules/secure";
import {
  loginParams,
  errorTypes,
  registerParams,
  registerReturn,
} from "../types/auth.interface";
import { AuthModel } from "../models/AuthModel";
import { Jwt } from "../modules/jwt";
import { AuthError } from "../error/error";

export class AuthSerive {
  static async register(
    userDTO: registerParams
  ): Promise<registerReturn | errorTypes> {
    const { password, rePassword } = userDTO;

    /** 비밀번호 일치여부 검사 */
    if (password !== rePassword) {
      return {
        msg: AuthError.PASSWORD_NOT_MATCH.msg,
      };
    }

    /** 암호화된 비밀번호 생성 */
    const salt = await Secure.getSalt();
    const hashPassword = await Secure.hash(password, salt);

    /** DB에 INSERT 요청 */
    userDTO.password = hashPassword;
    const userId = await AuthModel.insertUser(userDTO);

    return {
      status: 200,
      userId: userId,
    };
  }

  static async login(userDTO: loginParams) {
    const { userId, password } = userDTO;

    /** 공백 입력 검증 */
    if (userId.length === 0 || password.length === 0) {
      return {
        msg: AuthError.PASSWORD_NOT_MATCH.msg,
      };
    }

    /** 기존 패스워드와 입력받은 패스워드가 일치하는지 검증 */
    const hashedPassword = await AuthModel.getPassword(userId);
    if (!Secure.comparePassword(password, hashedPassword)) {
      return {
        msg: AuthError.PASSWORD_NOT_MATCH.msg,
      };
    }

    const accessToken = Jwt.create(userId);
    return {
      status: 200,
      accessToken: accessToken,
    };
  }
}
