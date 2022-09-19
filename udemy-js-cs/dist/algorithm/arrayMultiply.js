"use strict";
// export function arrayMultiply(array1: number[], array2: number[]) {
//   /** 길이를 체크해서 같지않으면 없다고 판단하여 리턴 */
//   if (array1.length !== array2.length) {
//     return false;
//   }
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayMultiply = void 0;
function arrayMultiply(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    const frequencyCounter1 = {};
    const frequencyCounter2 = {};
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
exports.arrayMultiply = arrayMultiply;
