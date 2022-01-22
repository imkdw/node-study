/**
 * cluster 모듈은 기본적으로 단일 코어로 동작하는 자바스크립트가 모든 코어를 사용할 수 있게 해준다.
 * 동일한 포트에서 노드 프로세스를 여러개 띄울 수 있어 병렬로 실행된 서버의 개수만큼 작업을 분산시킬수 있다.
 * worker_threads의 경우 스레드 기반으로 작동하지만, cluster의 경우 프로세스 기반으로 작동한다.
 */

const cluster = require('cluster');
const http = require('http');

// os모듈을 사용해서 cpu의 갯수를 가져온다.
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // cpu의 갯수만큼 worker들을 생성한다.
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  // 워커가 종료되었을 때
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log('code', code, 'signal', signal);
    cluster.fork();
  });
} else {
  // 워커들이 포트에서 대기
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Cluster!</p>');
    setTimeout(() => { // 워커 존재를 확인하기 위해 1초마다 강제 종료시킴.
      process.exit(1);
    }, 1000);
  }).listen(8086);

  console.log(`${process.pid}번 워커 실행`);
}