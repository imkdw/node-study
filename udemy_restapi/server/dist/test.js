"use strict";
exports.__esModule = true;
exports.solution = void 0;
function solution(n) {
    var max = 0;
    var result;
    for (result = n; result > 1; result--) {
        if (n % result === 1) {
            max = result;
        }
    }
}
exports.solution = solution;
