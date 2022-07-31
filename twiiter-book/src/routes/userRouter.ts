import express from 'express';
import UserService from '../service/userService';

const userRouter = express.Router();

userRouter.post('/follow', async (req, res) => {
  const { id, follow } = req.body;

  try {
    const followRecord = await UserService.addFollow(id, follow);
    res.send('팔로우 성공!');
  } catch (err) {
    console.error(err);
    res.status(400).send('DB Error');
  }
});

export default userRouter;
