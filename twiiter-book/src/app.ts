import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRouter from './routes/authRouter';
import tweetRouter from './routes/tweetRouter';
import userRouter from './routes/userRouter';
import path from 'path';

dotenv.config();

export const app = express();
app.set('port', process.env.PORT || 5000);

/** 미들웨어 정의 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** 라우터 정의 */
app.use('/auth', authRouter);
app.use('/tweet', tweetRouter);
app.use('/user', userRouter);

app.get('/test', (req, res) => {
  res.send('success');
});

app.listen(app.get('port'), () => {
  console.log(`Server Running : PORT : ${app.get('port')}`);
});
