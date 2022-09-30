/**
 * 메세지 1 바로 전송
 * 6초 뒤 메세지 2 전송
 * 4초 뒤 메세지 3 전송
 * 위 로직은 7번 반복
 */

function promiseMessage(message: string, ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(message), ms);
  });
}

export async function messageEvent() {
  const datas = [
    { message: "First Message", ms: 1 },
    { message: "Second Message", ms: 6000 },
    { message: "Third Message", ms: 4000 },
  ];

  for (let i = 0; i < 7; i++) {
    for (const data of datas) {
      const { message, ms } = data;
      console.log(await promiseMessage(message, ms));
    }
  }
}
