/**
 * 아래 처럼 다른 포트에서 서버를 여러개 여는것도 가능하다.
 * 이 때 주의할 점은 포트를 달라야된다는 것이다.
 * 8080포트로 서버를 연뒤 다시 8080포트로 서버를 열면 EADDRINUSE 에러가 발생하게된다.
 * 하지만 실무에서 아래와 같은 방식으로 서버를 여러개 띄우는 일은 드물다고 한다.
 */

const http = require('http');

// 8080 포트로 서버 오픈
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8;' });
  res.write(`Hello!! I'm imkdw`);
  res.end(`<p>Hello Server!</p>`);
})
  .listen(8080, () => console.log('서버가 8080포트에서 대기중 입니다.'));


// 8081 포트로 서버 오픈
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8;' });
  res.write(`Hello!! I'm imkdw`);
  res.end(`<p>Hello Server!</p>`);
})
  .listen(8081, () => console.log('서버가 8081포트에서 대기중 입니다.'));