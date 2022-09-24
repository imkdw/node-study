export function countDown(num: number) {
  if (num <= 0) {
    console.log("All Done!");
    return;
  }

  console.log(num);
  num--;
  countDown(num);
}

export function sumRange(num: number): number {
  if (num === 1) {
    return 1;
  }

  return num + sumRange(num - 1);
}

export function factorial(num: number): number {
  if (num <= 1) {
    return 1;
  }

  return num * factorial(num - 1);
}

/** Helper */
export function collectOddValeus(arr: number[]) {
  const result: number[] = [];

  function helper(helperInput: number[]) {
    if (helperInput.length === 0) {
      return;
    }

    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0]);
    }

    helper(helperInput.slice(1));
  }

  helper(arr);

  return result;
}

export function power(num: number, count: number): number {
  if (count === 0) {
    return 1;
  }

  return num * power(num, count - 1);
}

export function productOfArray(arr: number[]): number {
  let result = 1;

  function helper(helperInput: number[]) {
    if (helperInput.length === 0) {
      return;
    }

    result = result * helperInput[0];
    helper(helperInput.slice(1));
  }

  helper(arr);

  return result;
}

export function recursiveRange(num: number): number {
  if (num <= 0) {
    return 0;
  }

  return num + recursiveRange(num - 1);
}

export function fib(num: number): number {
  if (num <= 2) {
    return 1;
  }

  return fib(num - 1) + fib(num - 2);
}

export function reverse(str: string): string {
  if (str.length <= 1) {
    return str;
  }

  console.log(str);
  return reverse(str.slice(1)) + str[0];
}

export function isPalindrome(str: string): boolean {
  /** 한글자는 무조건 펠린드롬 */
  if (str.length === 1) {
    return true;
  }

  /** 두글자는 0, 1번째 인덱스의 문자열이 같다면 펠린드롬 */
  if (str.length === 2) {
    return str[0] === str[1];
  }

  /** 처음 글자와 마지막 글자가 같다면 다음 문자를 판별하기 위해 재귀호출 */
  if (str[0] === str.slice(-1)) {
    return isPalindrome(str.slice(1, -1));
  }

  return false;
}

export function someRecursive(arr: number[], cb: (number: number) => boolean): boolean {
  /** 배열의 길이가 0이면 무조건 false */
  if (arr.length === 0) {
    return false;
  }

  /** 콜백함수에 인자를 넘겨 true일 경우 true 리턴 */
  if (cb(arr[0])) {
    return true;
  }

  /** 배열의 요소 하나하나 콜백함수로 체크 */
  return someRecursive(arr.slice(1), cb);
}

export function flatten(arr: any): number[] {
  let newArr: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      /** arr[i]가 배열일 경우 flatten을 재귀호출하여 배열 내부 값 찾아냄*/
      newArr = newArr.concat(flatten(arr[i]));
    } else {
      /** 배열이 아니면 바로 newArr에 push */
      newArr.push(arr[i]);
    }
  }

  return newArr;
}

export function capitalizeFirst(array: string[]): string[] {
  /** 배열 내부 문자열의 앞글자를 대문자로 + 배열 첫번재 글자를 1번째부터 짜름 */
  if (array.length === 1) {
    return [array[0][0].toUpperCase() + array[0].substr(1)];
  }

  const res = capitalizeFirst(array.slice(0, -1));
  const string = array.slice(array.length - 1)[0][0].toUpperCase() + array.slice(array.length - 1)[0].substr(1);
  res.push(string);
  return res;
}
