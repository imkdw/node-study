"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSort = exports.insertionSort = exports.selectionSort = exports.bubbleSort = exports.basicSort = void 0;
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
    const swap = (arr, index1, index2) => {
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    };
    let noSwaps = false;
    for (let i = 0; i < arr.length; i++) {
        noSwaps = true;
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                noSwaps = false;
            }
        }
        console.log(JSON.stringify(arr));
        if (noSwaps) {
            /** 이전 루프에서 스왑이 없었으면 정렬이 완료됬다고 생각 */
            break;
        }
    }
    return arr;
}
exports.bubbleSort = bubbleSort;
function selectionSort(arr) {
    const swap = (arr, index1, index2) => {
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    };
    for (let i = 0; i < arr.length; i++) {
        let lowest = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[lowest]) {
                lowest = j;
            }
        }
        if (i !== lowest) {
            swap(arr, i, lowest);
        }
    }
    return arr;
}
exports.selectionSort = selectionSort;
function insertionSort(arr) {
    const swap = (arr, index1, index2) => {
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    };
    for (let i = 1; i < arr.length; i++) {
        let currentVal = arr[i];
        for (let j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
            swap(arr, j, j + 1);
        }
    }
    return arr;
}
exports.insertionSort = insertionSort;
function mergeSort(arr1, arr2) {
    let results = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr2[j] > arr1[i]) {
            results.push(arr1[i]);
            i++;
        }
        else {
            results.push(arr2[j]);
            j++;
        }
    }
    while (i < arr1.length) {
        results.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        results.push(arr2[j]);
        j++;
    }
    return results;
}
exports.mergeSort = mergeSort;
