const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express()
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));

try {
  fs.mkdirSync('uploads');
} catch (err) {
  console.error(`[ERROR] uploads 폴더가 이미 있습니다.`);
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/multipart', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});

app.post('/upload', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
  console.log(req.files, req.body);
  res.send('ok');
});

app.listen(app.get('port'), () => console.log(`${app.get('port')}번 포트에서 실행중`));