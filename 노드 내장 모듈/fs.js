// 파일시스템에 접근하는 모듈로서 파일/폴더 삭제, 생성, 실행 등이 가능하다.
const fs = require('fs');

// readme.txt 파일을 읽어들여서 콜백함수에 에러와 데이터를 넣는다.
fs.readFile('./readme.txt', (err, data) => {
  // 만약 에러가 있다면 에러를 호출한다.
  if (err) {
    throw err;
  }

  // 단순 data로 호출시 Buffer 이 출력된다. 
  // readme.txt 내용은 버퍼형식으로 제공되며 이는 메모리의 데이터이다.
  console.log(data);

  // 버퍼 데이터를 toString() 메서드를 사용해서 변환하면 정상적으로 출력된다.
  console.log(data.toString());
});

// 기본적으로 fs 모듈은 callback 형식이기 때문에 실무에서 사용하기가 어렵다고 한다.
// 이때 fs.prmises를 사용하면 기존 콜백패턴에서 프로미스 형식으로 바꿔주는 방식을 사용할 수 있다.
const promisesFs = require('fs').promises;

// 프로미스 형식으로 바꾼 fs모듈에 writeFile 메서드를 사용해서 writeme.txt 파일을 만들고 '글이 입력된다.' 라는 텍스트를 작성한다.
promisesFs.writeFile('./writeme.txt', '글이 입력된다.')
  // 성공시 fs모듈의 readFile 메서드로 writeme.txt 파일의 내용을 읽어온다.
  .then(() => { return promisesFs.readFile('./writeme.txt') })
  // 그 후 위에서 return 한 data 를 toString() 메서드로 원문으로 출력한다.
  .then(data => console.log(data.toString()))
  .catch(err => console.error(err))

  



