/**
 * 단방향 암호화
 * 1. 복호화가 불가능한 암호화 방식을 뜻함.
 * 2. 한번 암호화 되면 다시 원본 텍스트는 찾을 수 없음.
 * 3. 이를 해시 함수 라고 부르기도 함.
 */

// 다양한 방식의 암호화를 도와주는 모듈
const crypto = require('crypto');

/**
 * createHash(알고리즘) : 사용할 해시 알고리즘을 넣음. sha512, sha3 등
 * update(비밀번호) : 비밀번호 원문을 넣음
 * digest(인코딩) : 인코딩할 알고리즘을 넣음. hex, base64, latin1 등
 */
const base64 = crypto.createHash('sha512').update('password1234').digest('base64');
console.log(`base64 : ${base64}`);

const hex = crypto.createHash('sha512').update('password1234').digest('base64');
console.log(`hex : ${hex}`);



/**
 * pbkdf2 알고리즘으로 패스워드 암호화 하기
 * 1. crypto.randomBytes 메서드로 64bit 길이의 문자열을 생성 -> salt 가 됨.
 * 2. pbkdf2 메서드에는 인자로 pbkdf2(패스워드원문, salt, 반복횟수, 해시알고리즘, 콜백함수 인자)가 들어간다.
 * 3. sha512로 변환된 결과값을 다시 sha512로 변환하는 과정을 100,000번 수행한다.
 * 4. 추후 원문을 찾기 위해선 salt값이 필요하므로 꼭 보관해둬야 한다.
 */
crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64');
  crypto.pbkdf2('password1234', salt, 100000, 64, 'sha512', (err, key) => {
    console.log(`password : ${key.toString('base64')}`);
  });
});



/**
 * 양방향 암호화
 * 1. 암호화된 문자열을 복호화가 가능하다.
 * 2. 암호를 복호화 할려면 암호화시 사용한 key값이 필요하다.
 */
const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456'; // 아무 문자나 타이핑해서 만든 key값(꼭 32바이트여야 한다.)
const iv = '1234567890123456'; // 16바이트의 초기화 벡터

// 암호화 알고리즘, key값(32바이트) 그리고 iv/초기화벡터(16바이트)를 넣는다.
const cipher = crypto.createCipheriv(algorithm, key, iv);

// 암호화 대상의 인코딩, 출력결과 인코딩을 넣는다. 문자열은 보통 utf8, 암호는 base64를 많이 사용한다.
let result = cipher.update('password1234', 'utf8', 'base64');

// 출력 결과물의 인코딩을 넣게되면 암호화가 완료된다.
result += cipher.final('base64');
console.log(`암호화 : ${result}`);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
// 기존 암호의 경우 base64 인코딩이며 복호화 후 텍스트는 utf8 인코딩 이므로 각각 값을 넣는다.
let result2 = decipher.update(result, 'base64', 'utf8');

// 출력 결과물의 인코딩을 넣게되면 복호화가 완료된다.
result2 += decipher.final('utf8');
console.log(`복호화 : ${result2}`);