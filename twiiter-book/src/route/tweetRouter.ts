import express from "express";
import TweetService from "../service/tweetService";

const tweetRouter = express.Router();

tweetRouter.post("/", async (req, res) => {
  const payload = req.body;

  if (payload.tweet.length > 300) {
    res.status(400).send("300자를 초과했습니다.");
    return;
  }

  try {
    const tweetRecord: any = await TweetService.newTweet(payload);
    const lastRowId = tweetRecord.insertId;
    const searchTweetRecord = await TweetService.searchTweet(lastRowId);
    res.send(searchTweetRecord[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("DB Error");
  }
});

tweetRouter.get("/timeline/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  try {
    const timelineRecord = await TweetService.loadTimeline(userId);
    res.send(timelineRecord);
  } catch (err) {
    console.error(err);
    res.status(400).send("DB Error");
  }
});

export default tweetRouter;
