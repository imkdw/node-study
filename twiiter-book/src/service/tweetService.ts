import TweetModel from "../model/tweetModel";
import { tweetParams } from "../types/tweet.interface";

class TweetService {
  static newTweet = async (payload: tweetParams) => {
    const newTweetRecord = await TweetModel.newTweet(payload);
    return newTweetRecord;
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
