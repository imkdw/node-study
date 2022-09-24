export function linearSearch(arr: number[], value: number) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }

  return -1;
}

export function binarySearch(array: number[], value: number): number {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);

    if (array[middle] === value) {
      return middle;
    } else if (value < array[middle]) {
      right = middle - 1;
    } else if (value > array[middle]) {
      left = middle + 1;
    }
  }

  return -1;
}

export function navieStringSearch(long: string, short: string) {
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
