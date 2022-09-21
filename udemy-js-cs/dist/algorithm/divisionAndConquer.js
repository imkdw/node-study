"use strict";
// export function search(arr: number[], val: number) {
//   /** 시간복잡도 : O(n) */
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
//   /** Array.indexOf 사용하기 */
//   const index = arr.indexOf(val) ? arr.indexOf(val) : -1;
//   return index;
//   /** for문으로 찾기 */
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === val) {
//       return i;
//     }
//   }
//   return -1;
// }
function search(arr, val) {
    let min = 0;
    let max = arr.length - 1;
    while (min <= max) {
        let middle = Math.floor((min + max) / 2);
        let currentElement = arr[middle];
        if (arr[middle] < val) {
            min = middle + 1;
        }
        else if (arr[middle] > val) {
            max = middle - 1;
        }
        else {
            return middle;
        }
    }
    return -1;
}
exports.search = search;
