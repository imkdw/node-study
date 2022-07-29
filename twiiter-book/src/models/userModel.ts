import connection from "../db";

class UserModel {
  static addFollow = async (userId: number, followUserId: number) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO users_follow_list(user_id, follow_user_id) VALUES (?, ?)";
      connection.query(query, [userId, followUserId], (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  };
}

export default UserModel;
