import TweetModel from "../model/tweetModel";
import { tweetParams } from "../types/tweet.interface";

class TweetService {
  static newTweet = async (payload: tweetParams) => {
    const newTweetRecord = TweetModel.newTweet(payload);
    return newTweetRecord;
  };
}

export default TweetService;
