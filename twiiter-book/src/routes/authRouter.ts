import express from 'express';
import AuthService from '../service/authService';

const authRouter = express.Router();

authRouter.post('/sign-up', async (req, res) => {
  const newUser = req.body;
  try {
    const newUserRecord = await AuthService.signUp(newUser);
    res.send(newUserRecord);
  } catch (err) {
    console.log(err);
    res.status(400).send('DB Error');
  }
});

authRouter.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;
  try {
    const accessToken = await AuthService.signIn(email, password);
    if (typeof accessToken === 'string') {
      res.send({ email: email, accessToken: accessToken });
    }
  } catch (err) {
    console.error(err);
    res.status(400).send('DB Error');
  }
});

export default authRouter;
