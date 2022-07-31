import { MysqlError } from 'mysql';
import UserModel from '../models/userModel';

class UserService {
  static addFollow = async (userId: number, followUserId: number): Promise<MysqlError | number> => {
    try {
      const followRecord = await UserModel.addFollow(userId, followUserId);
      return followRecord;
    } catch (err) {
      return err;
    }
  };
}

export default UserService;
