const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//떡먹는 호랑이
rl.on('line', (line) => {
  const [A, B] = line.split(' ').map(Number);

  const table = Array(A).fill([0, 0]);
  table[0] = [1, 0];
  table[1] = [0, 1];
  for (let i = 2; i < A; i++) {
    const [x1, y1] = table[i - 1];
    const [x2, y2] = table[i - 2];
    table[i] = [x1 + x2, y1 + y2];
  }
  const [X, Y] = table.pop();
  let _y = Math.floor(B / Y);
  if (B === _y * Y) {
    _y--;
  }

  let [x, y] = [1, _y];

  while (true) {
    if (x * X + y * Y === B) {
      console.log(`${x}\n${y}`);
      process.exit(0);
    }

    x++;
    if (B < x * X + y * Y) {
      y--;
      [x, y] = [1, y];
    }
  }
}).on('close', () => {
  process.exit();
});
