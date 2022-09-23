"use strict";
// function maxSubarraySum(arr, num) {
//   if (arr.length < num) return null;
//   let total = 0;
//   for (let i = 0; i < num; i++) {
//     total += arr[i];
//   }
//   let currentTotal = total;
//   for (let i = num; i < arr.length; i++) {
//     currentTotal += arr[i] - arr[i - num];
//     total = Math.max(total, currentTotal);
//   }
//   return total;
// }
// function minSubArrayLen(nums, sum) {
//   let total = 0;
//   let start = 0;
//   let end = 0;
//   let minLen = Infinity;
//   while (start < nums.length) {
//     if (total < sum && end < nums.length) {
//       total += nums[end];
//       end++;
//     } else if (total >= sum) {
//       minLen = Math.min(minLen, end - start);
//       total -= nums[start];
//       start++;
//     } else {
//       break;
//     }
//   }
//   return minLen === Infinity ? 0 : minLen;
// }
// function findLongestSubstring(str) {
//   let longest = 0;
//   let seen = {};
//   let start = 0;
//   for (let i = 0; i < str.length; i++) {
//     let char = str[i];
//     if (seen[char]) {
//       start = Math.max(start, seen[char]);
//     }
//     longest = Math.max(longest, i - start + 1);
//     seen[char] = i + 1;
//   }
//   return longest;
// }
