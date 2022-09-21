interface ICounter {
  [key: string]: number;
}

export function sameFrequency(str1: number, str2: number): boolean {
  if (String(str1).length !== String(str2).length) {
    return false;
  }

  const counter1: ICounter = {};
  const counter2: ICounter = {};

  for (const str of String(str1)) {
    counter1[str] = (counter1[str] || 0) + 1;
  }

  for (const str of String(str2)) {
    counter2[str] = (counter2[str] || 0) + 1;
  }

  for (const item in counter1) {
    if (!(item in counter2)) {
      return false;
    }

    if (counter1[item] !== counter2[item]) {
      return false;
    }
  }

  return true;
}

type areThereParams = number[] | string[];
interface ICounter1 {
  [key: number | string]: number;
}

export function areThereDuplicates(...data: areThereParams): boolean {
  /** Multiple Pointers */
  // let start = 0;
  // let end = data.length - 1;

  // for (let i = 0; i < data.length; i++) {
  //   if (data[start] === data[end] && start !== end) {
  //     return true;
  //   }

  //   if (data[start] < data[end]) {
  //     start++;
  //   } else {
  //     end--;
  //   }
  // }

  // return false;

  /** Frequency Counter */
  const counter: ICounter1 = {};

  data.forEach((item) => {
    counter[item] = (counter[item] || 0) + 1;
  });

  for (const item in counter) {
    if (counter[item] >= 2) {
      return true;
    }
  }

  return false;
}
