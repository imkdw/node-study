import express from "express";
import TweetService from "../service/tweetService";
import { checkLogin } from "../middleware/checkLogin";
import UserService from "../service/userService";
import { services } from "../service";

const tweetRouter = express.Router();
const userService = services.UserService;
const tweetService = services.TweetService;

tweetRouter.post("/", checkLogin, async (req, res) => {
  // accessToken: ..., tweet: ...
  const payload = req.body;

  const tweetRecord = await TweetService.newTweet(payload);
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
