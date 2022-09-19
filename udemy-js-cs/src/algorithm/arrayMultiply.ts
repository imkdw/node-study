// export function arrayMultiply(array1: number[], array2: number[]) {
//   /** 길이를 체크해서 같지않으면 없다고 판단하여 리턴 */
//   if (array1.length !== array2.length) {
//     return false;
//   }

//   /**
//    * Array.includes의 경우 배열을 모두 순회함
//    * for 내부에 O(n)이 존재
//    * 최종 시간복잡도 : O(n^2)
//    */
//   for (const item of array1) {
//     if (!array2.includes(item ** 2)) {
//       return false;
//     }
//   }

//   return true;
// }

interface IFrequencyCounter {
  [key: number]: number;
}

export function arrayMultiply(array1: number[], array2: number[]) {
  if (array1.length !== array2.length) {
    return false;
  }

  const frequencyCounter1: IFrequencyCounter = {};
  const frequencyCounter2: IFrequencyCounter = {};

  array1.forEach((item) => {
    frequencyCounter1[item] = (frequencyCounter1[item] || 0) + 1;
  });

  array2.forEach((item) => {
    frequencyCounter2[item] = (frequencyCounter2[item] || 0) + 1;
  });

  for (const key in frequencyCounter1) {
    if (!(Number(key) ** 2 in frequencyCounter2)) {
      return false;
    }

    if (frequencyCounter2[Number(key) ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }

  return true;
}
