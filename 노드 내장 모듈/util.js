// 이름과 동일하게 각종 편의 기능들을 모아둔 묘듈이다.
const util = require('util');
const crypto = require('crypto');

// deprecated : 중요도가 떨어져서 더 이상 사용되지 않고 곧 사라지게 될 것이라는 뜻
// 아래 dontUseMe 함수는 정상적인 기능은 하나 util.deprecated 메서드로 인해 DeprecationWarning 메세지를 출력하게 된다.
const dontUseMe = util.deprecate((x, y) => {
  console.log(x + y);
}, 'dontUseMe 함수는 deprecate 되었습니다. 더이상 사용하지 마세요.');

dontUseMe(1, 2);


// callback 패턴을 promise 패턴으로 바꾸는 기능이다.
// callback 함수를 변경 할 인수로 제공하면 된다.
// 추가로 callbackify도 있지만 자주 사용되진 않는다.
const ramdomBytesPromise = util.promisify(crypto.randomBytes);
ramdomBytesPromise(64)
  .then(buf => console.log(buf.toString('base64')))
  .catch(error => console.error(error));