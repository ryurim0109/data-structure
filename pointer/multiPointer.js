function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let sum = arr[left] + arr[right];
    if (!sum) {
      return [arr[left], arr[right]];
    }
    if (sum > 0) {
      right--;
      return;
    }
    left++;
  }
}

const list = [-4, 4];
console.log(sumZero[list]);
