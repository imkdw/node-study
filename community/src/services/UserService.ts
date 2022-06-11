import { Secure } from "../modules/secure";
import {
  loginParams,
  errorTypes,
  registerParams,
  registerReturns,
} from "../types/auth.interface";
import { UserModel } from "../models/UserModel";
import { Jwt } from "../modules/jwt";

const errCodes = {
  PASSWORD_NOT_MATCH: {
    // 400, 회원가입시 패스워드 불일치
    status: 400,
    msg: "PASSWORD_NOT_MATCH",
  },
  ACCOUNT_LENGTH_ZERO: {
    // 400, 로그인시 아이디, 비밀번호 미입력시
    status: 400,
    msg: "ACCOUNT_LENGTH_ZERO",
  },
  ACCOUNT_NOT_MATCH: {
    // 400, 로그인시 아이디가 존재하지 않거나 패스워드가 틀린경우
    status: 400,
    msg: "ACCOUT_NOT_MATCH",
  },
};

export class UserSerive {
  static async register(
    userDTO: registerParams
  ): Promise<registerReturns | errorTypes> {
    const { password, rePassword } = userDTO;

    /** 비밀번호 일치여부 검사 */
    if (password !== rePassword) {
      return {
        status: errCodes.PASSWORD_NOT_MATCH.status,
        msg: errCodes.PASSWORD_NOT_MATCH.msg,
      };
    }

    /** 암호화된 비밀번호 생성 */
    const salt = await Secure.getSalt();
    const hashPassword = await Secure.hash(password, salt);

    /** DB에 INSERT 요청 */
    userDTO.password = hashPassword;
    const userRecord = await UserModel.insertUser(userDTO);

    return userRecord;
  }

  static async login(userDTO: loginParams) {
    const { userId, password } = userDTO;

    /** 공백 입력 검증 */
    if (userId.length === 0 || password.length === 0) {
      return {
        status: errCodes.PASSWORD_NOT_MATCH.status,
        msg: errCodes.PASSWORD_NOT_MATCH.msg,
      };
    }

    /** 기존 패스워드와 입력받은 패스워드가 일치하는지 검증 */
    const hashedPassword = await UserModel.getPassword(userId);
    if (!Secure.comparePassword(password, hashedPassword)) {
      return {
        status: errCodes.PASSWORD_NOT_MATCH.status,
        msg: errCodes.PASSWORD_NOT_MATCH.msg,
      };
    }

    const accessToken = Jwt.create(userId);
    return {
      status: 200,
      accessToken: accessToken,
    };
  }
}
