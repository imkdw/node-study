/**
 * listen 메서드에 콜백함수를 넣지않고 서버에 listening 이벤트 리스너를 붙여도 된다.
 * 추가로 에러 발생시 에러도 캐치할 수 있다.
 */

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8;' });
  res.write(`Hello!! I'm imkdw`);
  res.end(`<p>Hello Server!</p>`);
});

// server 변수에 http.createServer 메서드를 사용한 서버를 넣는다.
// 그 후 listen 메서드로 8080포트에서 서버를 개방한다.
server.listen(8080);

// on 메서드로 listening 이벤트를 추가해서 최초 실행시 메세지가 출력된다.
server.on('listening', () => console.log('8080번 포트에서 서버가 대기중'));

// 만약 에러 발생시 console.error() 메서드를 통해서 에러가 출력된다.
server.on('error', (err) => console.error(err));