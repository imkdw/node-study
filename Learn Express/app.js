const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
app.set('port', process.env.PORT || 3000);

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(app.get('port'), () => console.log(`${app.get('port')}번 에서 서버 실행중`));