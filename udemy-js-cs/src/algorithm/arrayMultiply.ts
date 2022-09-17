/**
 * 시간복잡도 : O(n)
 */
export function arrayMultiply(array1: number[], array2: number[]) {
  /** 길이를 체크해서 같지않으면 없다고 판단하여 리턴 */
  if (array1.length !== array2.length) {
    return false;
  }

  for (const item of array1) {
    if (!array2.includes(item ** 2)) {
      return false;
    }
  }

  return true;
}
