// export function sumZero(arr: number[]) {
//   /**
//    * 순차적으로 배열의 요소를 모두 순회함
//    * 시간복잡도 : O(n^2)
//    */
//   for (let i=0; i<arr.length; i++) {
//     for (let j=0; j<arr.length; j++) {
//       if (arr[i] + arr[j] === 0) {
//         return [arr[i], arr[j]]
//       }
//     }
//   }
// }

export function sumZero(arr: number[]) {
  /**
   * 멀티플 포인터를 이용해서 연산
   * 배열의 경우 오름차순(ASC)으로 정렬되어야 한다.
   * sum > 0 : left를 옮기게되면 값이 더 커지므로 right 포인터를 감소
   * sum < 0 : right를 옮기게 되면 값이 더 작아지므로 left 포인터를 감소
   */
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];

    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}
