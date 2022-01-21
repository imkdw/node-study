/**
 * 웹 브라우저의 요청과 응답
 * 1. 서버는 클라이언트가 있기에 동작한다.
 * 2. Client -> Server로 Requeust를 보내고, Server -> Client에게 Response를 보내준다. 이는 요청과 응답이다.
 * 3. 서버에서는 클라이언트로 부터 요청이 왔을때 어떤 작업을 해야할지 이벤트 리스너를 미리 등록해야한다.
 */

// http서버가 있어야 브라우저의 요청을 처리할 수 있으니 http모듈을 사용한다.
const http = require('http');

// http모듈 내부의 createServer 메서드를 사용했다. 해당 메서드는 콜백함수로 req(request), res(response)를 받을수 있다.
// req객체는 요청에 관한 정보를, res객체는 응답에 관한 정보를 가진다.
http.createServer((req, res) => {
  // res 즉 응답에 관한 정보를 기록하는 writeHead 메서드 이다.
  // 첫번째로는 http code 200은 성공(success)을 뜻한다.
  // 두번째로는 응답에 대한 정보를 보내는데 이를 html 형식이라고 알리고 있는것이다. 그리고 한글 표시를 위해 인코딩을 utf8로 지정한다. 이를 header라고 한다.
  res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });

  // write메서드의 첫번째 인수는 Client로 보낼 데이터이다. 아래에서는 html문서를 보냈지만 Buffer로 보낼수 있다.
  res.write(`<h1>Hello!! I'm imkdw</h1>`);

  // end메서드는 응답을 종료하는 메서드이다. 인수가 있다면 그것도 Client로 보내고 응답을 종료시킨다.
  res.end(`<p>Hello Server!</p>`);
})
  // createServer뒤에 listen 메서드를 붙여서 클라이언트에 공개할 포트 번호와 포트 연결시 실행될 콜백 함수를 넣는다.

  .listen(8080, () => console.log(`PORT : 8080 에서 서버가 대기중`));