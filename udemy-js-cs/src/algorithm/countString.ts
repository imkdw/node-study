interface Result {
  [key: string]: number;
}

export function countString(str: string) {
  const result: Result = {};
  for (const char of str.toLowerCase()) {
    /** 특수문자, 공백은 필터링 진행 */
    if (/[a-z0-9]/.test(char)) {
      if (result[char]) {
        result[char] += 1;
      } else {
        result[char] = 1;
      }
    }
  }

  return result;
}
