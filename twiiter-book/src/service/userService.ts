import UserModel from "../models/userModel";

class UserService {
  static addFollow = async (userId: number, followUserId: number) => {
    const followRecord = await UserModel.addFollow(userId, followUserId);
    return followRecord;
  };
}

export default UserService;
