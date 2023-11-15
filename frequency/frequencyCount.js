function same(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let frequencyCount1 = {};
  let frequencyCount2 = {};

  for (let val of arr1) {
    frequencyCount1[val] = (frequencyCount1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCount2[val] = (frequencyCount2[val] || 0) + 1;
  }

  for (let key in frequencyCount1) {
    if (!(key ** 2 in frequencyCount2)) {
      return false;
    }
    if (frequencyCount2[key ** 2] !== frequencyCount1[key]) {
      return false;
    }
  }

  return true;
}

console.log(same([1, 2, 3], [1, 4, 9])); // true
console.log(same([1, 2, 3], [1, 9, 9])); //false
