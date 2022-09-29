"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("./test");
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
// console.log(mergeSort([1, 10, 50], [2, 14, 99, 100]));
// console.log(mergeSort([1, 10, 50, 17, 12, 51, 2, 51, 15, 51, 512, 421, 4124, 1234, 21], [2, 14, 99, 100, 15, 1521, 12321, 536, 12321]));
function app() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, test_1.messageEvent)();
    });
}
app();
