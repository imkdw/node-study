import TweetModel from "../models/tweetModel";
import UserModel from "../models/userModel";
import Jwt from "../module/jwt";
import { serviceNewTweetParmas } from "../types/tweet.interface";

class TweetService {
  static newTweet = async (payload: serviceNewTweetParmas) => {};

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
