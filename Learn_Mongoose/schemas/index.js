const mongoose = require('mongoose');

const connect = () => {
  // 프로덕션 환경이 아닌 개발 환경을때 몽구스가 생성하는 sql을 볼수있는 옵션
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  // mongodb://[유저이름]:[비밀번호]@[호스트]:[포트]/[DB] 양식으로 들어간다.
  // 접속을 시도하는 db는 /admin 이다. 하지만 실제 db는 nodejs 이므로 dbName 옵션을 준다.
  mongoose.connect('mongodb://imkdw:1234@localhost:27017/admin', {
    dbName: 'nodejs',

    // 아래 두 속성은 실제로 넣지 않아도 되나 false로 설정될 경우 warning 메세지가 출력되어서 넣었다.
    useNewUrlParser: true,
    useCreateIndex: true,
  }, error => {
    if (error) {
      console.log(`MongoDB connection Error : ${error}`);
    } else {
      console.log(`MongoDB connection Success`);
    }
  });
};

mongoose.connection.on('error', error => console.log(`MongoDB connection Error : ${error}`));

// 연결이 끊긴경우 재연결 시도
mongoose.connection.on('disconnected', () => {
  console.log(`MongoDB is Disconnected.. Retry Connection`);
  connect();
});