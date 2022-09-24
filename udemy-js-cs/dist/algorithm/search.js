"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navieStringSearch = exports.binarySearch = exports.linearSearch = void 0;
function linearSearch(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }
    }
    return -1;
}
exports.linearSearch = linearSearch;
function binarySearch(array, value) {
    let left = 0;
    let right = array.length - 1;
    while (left <= right) {
        let middle = Math.floor((left + right) / 2);
        if (array[middle] === value) {
            return middle;
        }
        else if (value < array[middle]) {
            right = middle - 1;
        }
        else if (value > array[middle]) {
            left = middle + 1;
        }
    }
    return -1;
}
exports.binarySearch = binarySearch;
function navieStringSearch(long, short) {
    let count = 0;
    let checkCount = 0;
    for (let i = 0; i < long.length; i++) {
        if (long[i] === short[0]) {
            for (let j = 0; j < short.length; j++) {
                if (long[i + j] === short[j]) {
                    checkCount++;
                }
                if (checkCount === short.length) {
                    count++;
                    checkCount = 0;
                }
            }
        }
    }
    return count;
}
exports.navieStringSearch = navieStringSearch;
