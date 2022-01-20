// 폴더, 파일의 조작을 쉽게 조자하도록 도와주는 모듈
const path = require('path');

// __filename은 현재 파일의 이름을 나타낸다.
const currentFileName = __filename;

// __dirname은 현재 파일의 폴더 경로를 나타낸다.
const currentDirectory = __dirname;

// sepator의 약자로 경로의 구분자를 나타낸다.
// Window는 \ 으로, Linux 는 / 으로 구분한다.
console.log(`path.sep : ${path.sep}`)

// 환경변수의 구분자를 나타낸다.
// REPL에 process.env.PATH 를 입력하면 여러 경로가 이 구분자로 구분된다.
console.log(`path.delimiter : ${path.delimiter}`);

// 특정 파일이 위치한 경로를 나타내준다.
console.log(`path.dirname() : ${path.dirname(currentFileName)}`);

// 특정 파일의 확장자를 보여준다.
console.log(`path.extname() : ${path.extname(currentFileName)}`);

// 특정 파일의 이름(확장자를 포함해서)을 나타내준다.
console.log(`path.basename() : ${path.basename(currentFileName)}`);

// 파일의 이름만 표시하고 싶다면 두번쨰 인자로 확장자를 준다.
console.log(`path.basename - extname : ${path.basename(currentFileName, path.extname(currentFileName))}`);

// 파일의 경로를 root, dir, base, ext, name으로 분리해서 보여준다.
console.log(`path.parse() : ${path.parse(currentFileName)}`);

// path.format 의 결과물들을 한번에 합쳐준다.
console.log(`path.format() : ${path.format({ dir: 'C:\\Users\\imkdw', name: 'path', ext: '.js' })}`);

// / 또는 \를 실수해서 여러번 사용했을때 정상적인 경로로 변환해준다.
console.log(`path.normalize() : ${path.normalize('C:\\\\\\Users/////\imkdw')}`);

// 파일의 경로가 절대경로인지 상대경로인지 나타낸다.
console.log(`path.isAbsolute() : ${path.isAbsolute('C:\\')}`);
console.log(`path.isAbsolute() : ${path.isAbsolute('./home')}`);

// 인자로 두개의 경로를 넣으면 첫번째 파라미터 경로에서 두번째 파라미터 경로로 이동하는 법을 알려준다.
// 해당 예제에서는 '..'이 출력되며 이는 cd .. 명령어와 같이 상위 폴더로 이동하는것을 뜻한다.
console.log(`path.relative() : ${path.relative(`C:\\Users`, `C:\\`)}`);

// 여러 인수를 합해준다.
console.log(`path.join() : ${path.join(currentDirectory, '..', '..', 'users', '.')}`);

// path.join()과 동일하다. 하지만 resolve의 경우 ./를 만나면 절대경로로 인식해서 앞의 경로를 무시한다.
console.log(`path.resolve() : ${path.resolve(currentDirectory, '..', 'users', '.')}`);