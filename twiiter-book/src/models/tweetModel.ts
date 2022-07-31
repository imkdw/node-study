import { MysqlError } from 'mysql';
import connection from '../db';
import { selectTweetResult } from '../types/tweet.interface';

class TweetModel {
  static newTweet = async (userId: string, tweet: string): Promise<MysqlError | number> => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO tweets(user_id, tweet) VALUES(?, ?)';

      connection.query(query, [userId, tweet], (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result.insertId);
      });
    });
  };

  static searchTweet = async (lastRowId: number): Promise<MysqlError | selectTweetResult> => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, user_id, tweet FROM tweets WHERE  id=?';
      connection.query(query, [lastRowId], (err, result) => {
        if (err) {
          reject(err);
        }

        const data = {
          userId: result[0].user_id,
          tweet: result[0].tweet,
        };

        resolve(data);
      });
    });
  };

  static loadTimeline = async (userId: string) => {
    return new Promise((resolve, reject) => {
      const query =
        'SELECT t.user_id, t.tweet FROM tweets t LEFT JOIN users_follow_list ufl on ufl.user_id = ? WHERE t.user_id = ? OR t.user_id = ufl.follow_user_id';
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
