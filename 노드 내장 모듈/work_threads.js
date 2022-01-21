const { Worker, isMainThread, parentPort } = require('worker_threads');
/**
 * 자바스크립트는 싱글스레드로 동작하기 때문에 node도 마찬가지로 싱글스레드로 동작한다.
 * 싱글스레드는 연산에 있어서 하나의 코어만 사용해서 한다는 뜻이다.
 * 노드에서는 여러개의 코어가 동시에 연산할수 있도록 멀티스레드를 지원한다.
 * 이때 사용하는 모듈이 worker_threads 이다.
 */

// 기존에 동작하는 스레드를 메인스레드, 부모스레드라고 부른다.
// 현재 코드가 부모스레드에서 실행중인지 또는 생성한 워커스레드에서 생성중인지 판별이 가능하다.
if (isMainThread) {
  // 메인스레드 에서는 new Worker를 통해 현재 파일을 부모스레드에서 실행시키고 있다.
  // 이때 else 구문은 워커스레드에서 실행중이다.
  const worker = new Worker(__filename);

  // 부모는 worker.on('message') 으로 워커스레드에서 메세지를 받게된다.
  worker.on('message', message => console.log(`from worker : ${message}`));
  worker.on('exit', () => { console.log('worker exit') });

  // 부모스레드는 워커 생성 후 postMessage 로 워커에 데이터를 보낼수 있다.
  worker.postMessage('ping');
} else {
  // 워커스레드에서는 parentPort.on 메서드로 부모로 부터 메세지를 받게된다.
  parentPort.on('message', value => {
    console.log(`from parent : ${value}`);
    parentPort.postMessage('pong');

    // 워커스레드의 on 메서드 에서는 항상 직접 워커를 종료해줘야 한다.
    // parentPort.close() 를 하게되면 부모와의 연결이 종료된다.
    parentPort.close();
  });
}