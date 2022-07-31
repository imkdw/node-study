import express from 'express';
import TweetService from '../service/tweetService';
import { checkLogin } from '../middleware/checkLogin';

const tweetRouter = express.Router();

tweetRouter.post('/', checkLogin, async (req, res) => {
  const userTweet = req.body;
  const userId = res.locals.userId;
  const tweet = userTweet.tweet;
  try {
    const tweetRecord = await TweetService.newTweet(userId, tweet);

    if (!tweetRecord) {
      res.status(400).send('트윗이 300자를 초과했습니다.');
      return;
    }

    res.send(tweetRecord);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

tweetRouter.get('/timeline/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  try {
    const timelineRecord = await TweetService.loadTimeline(userId);
    res.send(timelineRecord);
  } catch (err) {
    console.error(err);
    res.status(400).send('DB Error');
  }
});

export default tweetRouter;
