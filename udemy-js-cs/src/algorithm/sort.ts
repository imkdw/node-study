export function basicSort(arr: number[] | string[]) {
  function asc(num1: number, num2: number) {
    return num1 - num2;
  }

  function desc(num1: number, num2: number) {
    return num2 - num1;
  }

  function sortByLength(str1: any, str2: any): number {
    return Number(str2.length - str1.length);
  }

  return arr.sort(sortByLength);
}

export function bubbleSort(arr: number[]) {
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
