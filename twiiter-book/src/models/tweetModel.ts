import connection from "../db";
import { tweetParams } from "../types/tweet.interface";

class TweetModel {
  static newTweet = async (payload: tweetParams) => {
    return new Promise((resolve, reject) => {
      const { id, tweet } = payload;
      const query = "INSERT INTO tweets(user_id, tweet) VALUES(?, ?)";

      connection.query(query, [id, tweet], (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  };

  static searchTweet = async (lastRowId: number) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT id, user_id, tweet FROM tweets WHERE  id=?";
      connection.query(query, [lastRowId], (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  };

  static loadTimeline = async (userId: string) => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT t.user_id, t.tweet FROM tweets t LEFT JOIN users_follow_list ufl on ufl.user_id = ? WHERE t.user_id = ? OR t.user_id = ufl.follow_user_id";
      connection.query(query, [userId, userId, userId], (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  };
}

export default TweetModel;
