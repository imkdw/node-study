import { Jwt } from "../modules/jwt";
import { UserError } from "../error/error";
import { errorTypes } from "../types/auth.interface";
import { userInfoReturn } from "../types/user.interface";
import { UserModel } from "../models/UserModel";

export class UserSerive {
  static async userInfo(userDTO: { accessToken: string }) {
    const { accessToken } = userDTO;

    /** accessToken 유효여부 검증 */
    if (accessToken.length === 0) {
      return {
        status: UserError.INVALID_TOKEN.status,
        msg: UserError.INVALID_TOKEN.msg,
      };
    }

    /** accessToken 복호화 작업 */
    const decodedToken = Jwt.decoded(accessToken);

    const userInfo = await UserModel.searchUser(decodedToken.userId);
    const { userId, name, email } = userInfo[0];
    return { userId, name, email };
  }
}
