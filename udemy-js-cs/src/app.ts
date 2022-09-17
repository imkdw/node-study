import { arrayMultiply } from "./algorithm/arrayMultiply";
import { countString } from "./algorithm/countString";
import { oneToN } from "./algorithm/oneToN";

/** 1부터 N까지 합 구하기 */
// console.log(oneToN(10));

/** 문자열 입력받아서 단어수 카운트 */
// console.log(countString("I Stduy Data Structure and Algoritm"));

/** 배열의 제곱이 다른 배열에 있는지 검사 */
console.log(arrayMultiply([1, 2, 3], [2, 3, 5]));
console.log(arrayMultiply([1, 2, 3], [1, 4, 9]));
