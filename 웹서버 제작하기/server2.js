const http = require('http');
const fs = require('fs').promises;

// http모듈의 createServer 메서드를 사용해서 웹wz서버를 오픈한다.
// 이 때 비동기 fs를 사용하기 위해서 async 함수를 만든다.
http.createServer(async (req, res) => {
  // 예외처리를 하기위해서 try...catch 문을 사용한다.
  try {
    // data는 server2.html 이며 await 메서드를 통해 데이터를 모두 읽어올때까지 대기한다.
    const data = await fs.readFile('server2.html');
    res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
    // end에는 fs 모듈로 불러온 data를 넣는다.
    res.end(data);
  } catch (err) {
    // 만약 에러가 발생했을 경우 에러를 콘솔창에 출력한다.
    console.error(err);
    // 500에러는 Internal Server Error으로 서버의 요청을 처리하는 과정에서 에러가 발생했다는 것을 알려준다.
    res.writeHead(500, { 'Content-type': 'text/plain; charset=utf-8' });

    // end에는 err.message를 보여주는데 이때는 일반 문자열 이므로 Content-type에 text/plain을 사용한다.
    res.end(err.message);
  }
})
  .listen(8080, () => console.log('8080번 포트에서 서버가 실행중입니다.'));