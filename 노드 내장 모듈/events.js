// node에서 이벤트를 만들수 있는 모듈이다.
const EventEmitter = require('events');

// myEvent 객체를 만든다. 해당 객체는 이벤트 관리를 위한 메서드를 가지고 있다.
const myEvent = new EventEmitter();

// addListener, on 은 기능이 동일하다.
// 이벤트명과 콜백함수를 인자로 넘겨 이벤트 발생시 해당 콜백이 실행된다.
// 해당 동작을 Event Listening 이라고 부른다.
myEvent.addListener('event1', () => console.log('이벤트1'));
myEvent.on('event2', () => console.log('이벤트2'));

// on 메서드를 통해서 다수의 이벤트를 연결할 수 있다.
myEvent.on('event2', () => console.log('이벤트2 추가'));

// 한번만 실행되는 이벤트이다. 여러번 호출해도 한번밖에 실행되지 않는다.
myEvent.once('event3', () => console.log('이벤트3'));

// event1 호출 -> '이벤트1'이 출력된다.
myEvent.emit('event1');

// event2 호출 -> '이벤트2', '이벤트2 추가' 두개의 콜백이 호출되어 문구가 출력된다.
myEvent.emit('event2');

// 처음 호출시 '이벤트3'이 출력되나 두번째 호출부턴 출력되지 않는다. 이는 once 메서드로 이벤트를 추가헀기 때문이다.
myEvent.emit('event3');
myEvent.emit('event3');

// event4에다가 이벤트를 추가한다.
myEvent.on('event4', () => console.log('이벤트4'));
// 모든 이벤트 리스너들을 제거하는 메서드이다.
myEvent.removeAllListeners('event4');
// 위에서 모든 이벤트 리스너들을 제거헀기 때문에 실행되지 않는다.
myEvent.emit('event4');

// 콜백함수를 따로 정의해서 on 메서드 인자에 추가할 수 있다.
const listener = () => console.log('이벤트5');

// 아래 문장은 다음과 동일하다. myEvent.on('event5', () => console.log('이벤트5'))
myEvent.on('event5', listener);

// event5에서 이벤트를 제거한다.
myEvent.removeListener('event5', listener);

// 이벤트를 제거했으므로 실행되지 않는다.
myEvent.emit('event5');

// listenerCount는 특정 이벤트가 가진 리스너의 갯수를 카운트 할 수 있다. event2에는 2개의 리스너가 있으므로 2가 출력된다.
console.log(myEvent.listenerCount('event2'));
