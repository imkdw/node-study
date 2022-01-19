// 운영체제게 내용을 가져올 수 있는 모듈
const os = require('os');

// 운영체제의 아키텍쳐 정보
// Window 기준 32bit 의 경우 x86, 64bit 의 경우 x64가 출력된다.
console.log(`os.arch() : ${os.arch()}`)

// 운영체제의 플랫폼 정보
// 64bit의 경우 32bit, 64bit 모두 호환이 된다.
console.log(`os.platform() : ${os.platform()}`);

// 운영체제의 타입 정보
// 윈도우의 경우 Windows_NT 가 출력되는데 이는 Window New Technology 를 뜻한다.
console.log(`os.type() : ${os.type()}`);

// 운영체제가 켜져있던 시간의 정보
// 출력은 초 단위로 출력되며 6000 -> 100분을 뜻한다.
console.log(`os.uptime() : ${os.uptime()}`);

// 운영체제의 호스트네임의 정보
// 윈도우 기준 내PC 의 속성 내부에 "컴퓨터이름 정보가 출력된다.
console.log(`os.hostname() : ${os.hostname()}`);

// 운영체제의 버전 정보
console.log(`os.release() : ${os.release()}`);

// 운영체제의 홈 디렉토리 정보
// 윈도우 기준 C:\Users 내부에 유저의 정보가 출력된다.
console.log(`os.homedir() : ${os.homedir()}`);

// 운영체제의 임시폴더 정보
// 윈도우 기준 C:\Users\AppData\Local\Temp 폴더가 출력된다.
console.log(`os.tmpdir() : ${os.tmpdir()}`);

// 운영체제의 CPU 정보
// 현재 사용중인 CPU가 출력된다.
console.log(`os.cpus() : ${os.cpus()}`);

// 운영체제의 CPU Core 의 갯수 정보
// CPU의 core의 갯수를 알 수 있다. 하지만 자바스크립트는 싱글스레드 기반이기에 하나의 코어밖에 쓰지 못한다.
console.log(`os.cpus().length : ${os.cpus().length}`);

// 운영체제의 사용 가능한 메모리의 크기 정보
console.log(`os.freemem() : ${os.freemem()}`);

// 운영체제의 총 메모리 크기 정보
console.log(`os.totalmem() : ${os.totalmem()}`);