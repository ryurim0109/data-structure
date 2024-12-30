const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 용액

// 투 포인터
// let n;
// rl.on('line', (line) => {
//   if (!n) {
//     n = Number(line);
//     return;
//   }
//   const list = line.split(' ').map(Number);
//   let [leftIdx, rightIdx] = [0, list.length - 1];
//   let [minLeftIdx, minRightIdx] = [0, list.length - 1];

//   while (leftIdx != rightIdx) {
//     const [minLeft, minRight] = [list[minLeftIdx], list[minRightIdx]];
//     const [left, right] = [list[leftIdx], list[rightIdx]];
//     const cur = left + right;
//     const min = minLeft + minRight;
//     if (Math.abs(cur) < Math.abs(min)) {
//       [minLeftIdx, minRightIdx] = [leftIdx, rightIdx];
//     }
//     if (Math.abs(right) === Math.abs(left)) {
//       break;
//     }
//     if (Math.abs(right) < Math.abs(left)) {
//       leftIdx++;
//     } else {
//       rightIdx--;
//     }
//   }
//   console.log([list[minLeftIdx], list[minRightIdx]].join(' '));
// }).on('close', () => {
//   process.exit();
// });
// 이분 탐색
let n;
rl.on('line', (line) => {
  if (!n) {
    n = Number(line);
    return;
  }
  const list = line.split(' ').map(Number);

  const find = (value, leftIdx, rightIdx) => {
    if (leftIdx === rightIdx) {
      return leftIdx;
    }

    const midIdx = Math.floor((rightIdx + leftIdx) / 2);
    const a = value + list[midIdx];
    const b = value + list[midIdx + 1];

    if (Math.abs(a) <= Math.abs(b)) {
      return find(value, leftIdx, midIdx);
    } else {
      return find(value, midIdx + 1, rightIdx);
    }
  };

  let [leftIdx, rightIdx] = [0, n - 1];
  for (let i = 1; i < n; i++) {
    const idx = find(list[i - 1], i, n - 1);
    if (
      Math.abs(list[i - 1] + list[idx]) <
      Math.abs(list[leftIdx] + list[rightIdx])
    ) {
      [leftIdx, rightIdx] = [i - 1, idx];
    }
  }
  console.log([list[leftIdx], list[rightIdx]].join(' '));
}).on('close', () => {
  process.exit();
});
