"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countString = void 0;
function countString(str) {
    const result = {};
    for (const char of str.toLowerCase()) {
        /** 특수문자, 공백은 필터링 진행 */
        if (/[a-z0-9]/.test(char)) {
            if (result[char]) {
                result[char] += 1;
            }
            else {
                result[char] = 1;
            }
        }
    }
    return result;
}
exports.countString = countString;
