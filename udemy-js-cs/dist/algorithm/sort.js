"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bubbleSort = exports.basicSort = void 0;
function basicSort(arr) {
    function asc(num1, num2) {
        return num1 - num2;
    }
    function desc(num1, num2) {
        return num2 - num1;
    }
    function sortByLength(str1, str2) {
        return Number(str2.length - str1.length);
    }
    return arr.sort(sortByLength);
}
exports.basicSort = basicSort;
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        console.log(arr);
    }
}
exports.bubbleSort = bubbleSort;
