const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  watch: true
})

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.locals.title = 'This is Title';
  res.render('index.html');
})

app.listen(app.get('port'), () => console.log(`${app.get('port')}번 에서 서버 실행중`));