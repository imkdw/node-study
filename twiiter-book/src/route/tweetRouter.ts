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

    res.send("트윗 저장 성공");
  } catch (err) {
    console.error(err);
    res.status(400).send("DB Error");
  }
});

export default tweetRouter;
