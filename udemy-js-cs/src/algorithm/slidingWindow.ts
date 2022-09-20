// export function maxSubarraySum(arr: number[], num: number) {
//   if (num > arr.length) {
//     return null;
//   }

//   /** 전체 배열을 순회하면서 num의 수만큼 temp에 저장 후 비교하는 방식 */
//   /** 시간복잡도 : O(n^2) */
//   let max = -Infinity;
//   let temp: number;
//   for (let i = 0; i < arr.length - num + 1; i++) {
//     temp = 0;
//     for (let j = 0; j < num; j++) {
//       temp += arr[i + j];
//       console.log(temp);
//     }

//     if (temp > max) {
//       max = temp;
//     }
//   }

//   return max;
// }

export function maxSubarraySum(arr: number[], num: number) {
  let maxSum = 0;
  let tempSum = 0;

  if (arr.length < num) {
    return null;
  }

  /** maxSum에 0부터 num 까지 값을 저장 */
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }

  /** 임시로 sum 값을 저장 */
  tempSum = maxSum;

  /**  */
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }

  return maxSum;
}
