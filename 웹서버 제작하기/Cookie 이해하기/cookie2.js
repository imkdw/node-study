const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

// 쿠기가 없을경우 기본값으로 공백을 지정
const parseCookies = (cookie = '') =>
  cookie
    // 쿠기는 세미콜론으로 구분되므로 ; 으로 split 하여 배열로 만든다.
    .split(';')
    // 배열로 변환후 "=" 을 기준으로 다시한번 배열화 한다
    .map(v => v.split('='))
    // acc({}) 에다가 key:value 를 한쌍으로 추가한다.
    // decodeURIComponent는 쿠기가 영문으로 저장시 URL Encode되기 때문에 decode 하는것이다.
    // name=%EA%B9%80%EB%8F%99%EC%9A%B0 이라는 쿠기값이 {name : text}으로 변환된다.
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http.createServer(async (req, res) => {
  // req.headers 내부에 있는 쿠기를 parseCookies 함수를 통해 변환한다.
  const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }
  // 주소가 /login으로 시작하는 경우
  if (req.url.startsWith('/login')) {
    // url내부에 query를 가져온다.
    const { query } = url.parse(req.url);

    // name=text 형식에서 name을 가져오면 text만 추출하게된다.
    const { name } = qs.parse(query);

    // 쿠키의 유효시간을 현재 시간부터 5분후 까지로 지정한다.
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);

    /**
     * name : name에는 한글이 들어갈 수도 있으므로 encode해서 저장했다. 쿠키는 개행 또는 한글이 들어가면 안된다.
     * Expires : 쿠키의 만료기한이다. 위 코드에서는 현재시간+5분 으로 지정했다.
     * HttpOnly : 설정시 자바스크립트에서 쿠키 접근이 불가능하다. 이는 클라이언트에서 쿠키조작이 불가능하게 설정하는게 좋다.
     * Path : 쿠키가 전송될 URL 이다. 기본값은 / 이고 해당 경우 모든 URL에서 쿠키를 전송할 수 있다.
     */
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });

    res.end();
    // name이라는 쿠키가 있는 경우
  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${cookies.name}님 안녕하세요`);
  } else {
    try {
      // 쿠키가 없다면 쿠키를 입력받는 폼(html)을 보여준다.
      const data = await fs.readFile('./cookie2.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  }
})
  .listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!');
  });