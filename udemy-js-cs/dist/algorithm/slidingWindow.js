"use strict";
// export function maxSubarraySum(arr: number[], num: number) {
//   if (num > arr.length) {
//     return null;
//   }
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxSubarraySum = void 0;
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
function maxSubarraySum(arr, num) {
    let maxSum = 0;
    let tempSum = 0;
    /** 배열길이보다 num이 크면 합을 구할수 없기때문에 null 리턴 */
    if (arr.length < num) {
        return null;
    }
    /** 맨 처음 0 ~ num의 합 구하기 */
    for (let i = 0; i < num; i++) {
        maxSum += arr[i];
    }
    /** 임시로 sum 값을 저장 */
    tempSum = maxSum;
    /** tempSum에 새로운 값을 구하는게 아닌 이전숫자는 빼고 새로운 숫자를 더하는 방식으로 구현 */
    for (let i = num; i < arr.length; i++) {
        tempSum = tempSum - arr[i - num] + arr[i];
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
}
exports.maxSubarraySum = maxSubarraySum;
