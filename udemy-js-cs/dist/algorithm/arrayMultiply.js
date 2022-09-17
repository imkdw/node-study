"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayMultiply = void 0;
/**
 * 시간복잡도 : O(n)
 */
function arrayMultiply(array1, array2) {
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
exports.arrayMultiply = arrayMultiply;
