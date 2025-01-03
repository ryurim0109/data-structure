// 물병 - 비트  연산
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  let [N, K] = line.split(' ').map(Number);
  const store = [];

  let powI = 0;
  while (Math.pow(2, powI + 1) < N) {
    powI++;
  }

  while (1 < N) {
    if (N - Math.pow(2, powI) < 0) {
      powI--;
      continue;
    }
    N -= Math.pow(2, powI);
    store[powI] = 1;
  }
  if (N === 1) {
    store[0] = 1;
  }

  const isOver = () => {
    let count = 0;

    for (let i = 0; i < store.length; i++) {
      if (store[i]) count++;
      if (K < count) break;
    }

    return K < count;
  };

  const move = (startIdx) => {
    for (let i = startIdx; i < store.length; i++) {
      if (store[i] !== 2) {
        break;
      }

      store[i] = 0;
      store[i + 1] = (store[i + 1] || 0) + 1;
    }
  };
  const add = () => {
    const findIdx = store.findIndex(Boolean);
    store[findIdx] = (store[findIdx] || 0) + 1;

    move(findIdx);
    return Math.pow(2, findIdx);
  };

  let count = 0;

  while (isOver()) {
    count += add();
  }

  console.log(count);
}).on('close', () => {
  process.exit();
});
