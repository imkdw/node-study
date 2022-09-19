import { anagram } from "./algorithm/anagram";
import { arrayMultiply } from "./algorithm/arrayMultiply";
import { countString } from "./algorithm/countString";
import { sumZero } from "./algorithm/multiplePointers";
import { oneToN } from "./algorithm/oneToN";

/** 1부터 N까지 합 구하기 */
// console.log(oneToN(10));

/** 문자열 입력받아서 단어수 카운트 */
// console.log(countString("I Stduy Data Structure and Algoritm"));

/** 배열의 제곱이 다른 배열에 있는지 검사 - Frequency Counter Pattern */
// console.log(arrayMultiply([3, 7, 9, 3], [9, 49, 81, 9]));

/** 애너그램 - Frequency Counter Pattern */
// console.log(anagram("", "")); // true
// console.log(anagram("aaz", "zza")); // false

/** 멀티플 포인터 패턴 */
console.log(sumZero([-4, -3, -2, -1, 0, 1, 2, 3, 10]));
