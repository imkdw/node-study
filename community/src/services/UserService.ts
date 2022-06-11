import { Jwt } from "../modules/jwt";
import { UserError } from "../error/error";
import { errorTypes } from "../types/auth.interface";
import { UserModel } from "../models/UserModel";

export class UserSerive {
  static async getInfo(userDTO: { accessToken: string }): Promise<errorTypes> {
    const { accessToken } = userDTO;

    /** accessToken 유효여부 검증 */
    if (accessToken.length === 0) {
      return {
        msg: UserError.INVALID_TOKEN.msg,
      };
    }

    /** accessToken 복호화 작업 */
    const decodedToken = Jwt.decoded(accessToken);
    console.log(decodedToken);

    // const userInfo = await UserModel.searchUser(decodedToken.userId);
    // console.log(userInfo);
  }
}
