import { anagram } from "./algorithm/anagram";
import { arrayMultiply } from "./algorithm/arrayMultiply";
import {
  areThereDuplicates,
  averagePair,
  isSubsequence,
  maxSubarraySum1,
  minSubArrayLen,
  sameFrequency,
} from "./algorithm/challenge3";
import { countString } from "./algorithm/countString";
import { search } from "./algorithm/divisionAndConquer";
import { countUniqueValues, sumZero } from "./algorithm/multiplePointers";
import { oneToN } from "./algorithm/oneToN";
import { maxSubarraySum } from "./algorithm/slidingWindow";

/** 1부터 N까지 합 구하기 */
// console.log(oneToN(10))

/** 문자열 입력받아서 단어수 카운트 */
// console.log(countString("I Stduy Data Structure and Algoritm"))

/** 배열의 제곱이 다른 배열에 있는지 검사 - Frequency Counter Pattern */
// console.log(arrayMultiply([3, 7, 9, 3], [9, 49, 81, 9]))

/** 애너그램 - Frequency Counter Pattern */
// console.log(anagram("", ""))
// console.log(anagram("aaz", "zza"))

/** 멀티플 포인터 패턴을 사용해서 배열 내에서 합이 0이 되는 요소 찾기 */
// console.log(sumZero([-4, -3, -2, -1, 0, 1, 2, 3, 10]))

/** 멀티플 포인터 패턴 사용이 가능하지만 다른 방법으로 한 고유값 카운트 */
// console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]))

/** 배열에서 연속적으로 N개가 있는 값의 최대값을 구하기 */
// console.log(maxSubarraySum([1, 2, 5, 6, 1, 2, 6, 1], 2))

/** 배열에서 특정 값의 인덱스 찾기 */
// console.log(search([1, 2, 3], 3))

/** Frquency Counter - sameFrequency */
// console.log(sameFrequency(182, 281));

/** Frequency Counter / Multiple Pointers - areThereDuplicates */
// console.log(areThereDuplicates(1, 2, 2));
// console.log(areThereDuplicates("a", "b", "c", "c"));

/** Multiple Pointers - averagePair */
// console.log(averagePair([1, 2, 3], 2.5));
// console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8));

/** Multiple Pointers - isSubsequence */
// console.log(isSubsequence("hello", "hello world"));
// console.log(isSubsequence("sing", "sting"));
// console.log(isSubsequence("abc", "acb"));

/** Sliding Window - maxSubarraySum */
// console.log(maxSubarraySum1([100, 200, 300, 400], 2));

/** Sliding Window - minSubArrayLen */
console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7));
console.log(minSubArrayLen([2, 1, 6, 5, 4], 9));
