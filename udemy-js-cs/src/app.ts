import { capitalizeFirst, flatten, isPalindrome, reverse, someRecursive } from "./algorithm/recursive";
import { binarySearch, linearSearch, navieStringSearch } from "./algorithm/search";
import { basicSort, bubbleSort, insertionSort, mergeSort, selectionSort } from "./algorithm/sort";

/** Recursive Function Practice */
// countDown(5);
// console.log(sumRange(5));
// console.log(factorial(10));
// console.log(collectOddValeus([1, 2, 4, 5, 6, 7, 8, 9, 10]));
// console.log(power(2, 4));
// console.log(productOfArray([1, 2, 3, 10]));
// console.log(recursiveRange(6));
// console.log(fib(4));
// console.log(reverse("dongwoo"));
// console.log(isPalindrome("asdsa"));
// console.log(someRecursive([1, 2, 3], (num: any) => num % 2 === 1));
// console.log(someRecursive([4, 6, 8], (num: any) => num % 2 === 1));
// console.log(flatten([1, [2, [3, 4], [[5]]]]));
// console.log(capitalizeFirst(["car", "taco", "banana"]));

/** Search Algorithm Practice */
// console.log(linearSearch([10, 15, 20, 25, 30], 15));
// console.log(binarySearch([1, 2, 3, 4, 5], 2));
// console.log(navieStringSearch("abcdbaeabcd", "abc")); // 2
// console.log(navieStringSearch("javascript language, java language, c language, python language", "language")); // 2

/** Sort Algorithm */
// console.log(basicSort([1, 5, 2, 7, 11, 15, 22]));
// console.log(basicSort(["asd", "asdasd", "ajfn1io", "aasdunias2"]));
// console.log(bubbleSort([8, 1, 2, 3, 4, 5, 6, 7]));
// console.log(selectionSort([6, 3, 9, 1, 5]));
// console.log(insertionSort([6, 3, 9, 1, 5]));
console.log(mergeSort([1, 10, 50], [2, 14, 99, 100]));
