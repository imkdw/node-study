"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxSubarraySum1 =
  exports.isSubsequence =
  exports.averagePair =
  exports.areThereDuplicates =
  exports.sameFrequency =
    void 0;
function sameFrequency(str1, str2) {
  if (String(str1).length !== String(str2).length) {
    return false;
  }
  const counter1 = {};
  const counter2 = {};
  for (const str of String(str1)) {
    counter1[str] = (counter1[str] || 0) + 1;
  }
  for (const str of String(str2)) {
    counter2[str] = (counter2[str] || 0) + 1;
  }
  for (const item in counter1) {
    if (!(item in counter2)) {
      return false;
    }
    if (counter1[item] !== counter2[item]) {
      return false;
    }
  }
  return true;
}
exports.sameFrequency = sameFrequency;
function areThereDuplicates(...data) {
  /** Multiple Pointers */
  // let start = 0;
  // let end = data.length - 1;
  // for (let i = 0; i < data.length; i++) {
  //   if (data[start] === data[end] && start !== end) {
  //     return true;
  //   }
  //   if (data[start] < data[end]) {
  //     start++;
  //   } else {
  //     end--;
  //   }
  // }
  // return false;
  /** Frequency Counter */
  const counter = {};
  data.forEach((item) => {
    counter[item] = (counter[item] || 0) + 1;
  });
  for (const item in counter) {
    if (counter[item] >= 2) {
      return true;
    }
  }
  return false;
}
exports.areThereDuplicates = areThereDuplicates;
function averagePair(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const avg = (arr[left] + arr[right]) / 2;
    if (avg === num) {
      return true;
    }
    if (avg < num) {
      left += 1;
    } else {
      right -= 1;
    }
  }
  return false;
}
exports.averagePair = averagePair;
function isSubsequence(str1, str2) {
  let left = 0,
    right = 0;
  if (!str1) {
    return true;
  }
  while (right < str2.length) {
    if (str1[left] === str2[right]) {
      left += 1;
    }
    if (left === str1.length) {
      return true;
    }
    right += 1;
  }
  return false;
}
exports.isSubsequence = isSubsequence;
function maxSubarraySum1(arr, num) {
  let tempSum = 0,
    maxSum = 0;
  if (arr.length < num) {
    return null;
  }
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(tempSum, maxSum);
  }
  return maxSum;
}
exports.maxSubarraySum1 = maxSubarraySum1;
