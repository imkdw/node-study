import { MysqlError } from 'mysql';
import TweetModel from '../models/tweetModel';
import { selectTweetResult } from '../types/tweet.interface';

class TweetService {
  static newTweet = async (userId: string, tweet: string): Promise<MysqlError | boolean | selectTweetResult> => {
    if (tweet.length > 300) {
      return;
    }

    try {
      const tweetRecord: MysqlError | number = await TweetModel.newTweet(userId, tweet);
      if (typeof tweetRecord === 'number') {
        const newTweetRecord = TweetModel.searchTweet(tweetRecord);
        return newTweetRecord;
      }
    } catch (err) {
      return err;
    }
  };

  static searchTweet = async (lastRowId: number) => {
    const searchTweetRecord = await TweetModel.searchTweet(lastRowId);
    return searchTweetRecord;
  };

  static loadTimeline = async (userId: string) => {
    const timelineRecord = await TweetModel.loadTimeline(userId);
    return timelineRecord;
  };
}

export default TweetService;
