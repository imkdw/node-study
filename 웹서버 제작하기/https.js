/**
 * https : 웹 서버 + SSL 암호화
 * GET, POST 등 HTTP 요청시 중간에 데이터를 가로채더라도 확인할 수 없게 만든다.
 * 암호화를 적용하는 만큼 인증해줄 수 있는 기관도 필요한데, 이는 유료로 인증기관에서 구매할 수 있다.
 * Let's Encrypt 같은 기관에서는 무료로 발급해주기도 한다.
 */


// https 인증이 가능하도록 도와주는 모듈
const https = require('https');
const fs = require('fs')

/**
 * https 모듈은 http 모듈과 다르게 2개의 인수를 받는다.
 * 첫번째인수 : 인증서와 관련된 옵션 객체. cert, key, ca 옵션에 맞게 각 파일을 넣으면 된다.
 * 두번째인수 : http 모듈과 동일하게 request, response를 받는다.
 */
https.createServer({
  cert: fs.readFileSync('도메인 인증서'),
  key: fs.readFileSync('도메인 비밀키'),
  ca: [
    fs.readFileSync('상위 인증서'),
    fs.readFileSync('상위 인증서')
  ]
}, (req, res) => {
  res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Https!</h1>');
  res.end('<p>This is https module!</p>');
})
  // http가 포트 80번이라면 https는 포트 443번으로 동작한다.
  .listen(443, () => console.log('443 포트에서 https 서버가 실행중입니다.'));

/**
 * 기존 http, https 모듈은 http/1.1 으로 동작한다. http/1.1, http/2의 차이는 아래와 같다.
 * http/1.1 : 하나의 request의 대한 response가 도착하면 그 후 나머지 요청을 하나씩 처리한다.
 * http:2 : 여러개의 request를 한번에 요청할 수 있고, 동일하게 여러가지 response를 동시에 응답을 받을 수 있다.
 * 눈에 보일정도로 큰 차이는 없지만 http/2 방식이 훨씬 효율적인것은 분명하다.
 */

// http2 모듈은 http/2 를 효율적으로 사용할 수 있게 도와준다.
const http2 = require('http2');

// https 모듈과 거의 유사하지만 http2 모듈은 서버를 생성할 때 http2.createSecureServer 메서드를 사용한다.
http2.createSecureServer({
  cert: fs.readFileSync('도메인 인증서'),
  key: fs.readFileSync('도메인 비밀키'),
  ca: [
    fs.readFileSync('상위 인증서'),
    fs.readFileSync('상위 인증서')
  ]
}, (req, res) => {
  res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Https!</h1>');
  res.end('<p>This is https module!</p>');
})
  .listen(443, () => console.log('443 포트에서 https 서버가 실행중입니다.'));