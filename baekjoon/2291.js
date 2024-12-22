const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 2091동전
rl.on('line', (line) => {
  const [X, ...list] = line.split(' ').map(Number);
  const [A, B, C, D] = list;
  let rest = A;

  while (rest && (X - rest) % 5) {
    rest--;
  }

  if (!rest && !(X % 5)) {
    console.log('0 0 0 0');
    process.exit(0);
  }

  let [a, b, c, d] = [rest, 0, 0, 0];

  const sum = () => a + b * 5 + c * 10 + d * 25;

  const DFS = (a, b, c, d, depth) => {
    if (sum() === X) {
      console.log([a, b, c, d].join(' '));
      process.exit(0);
    }

    if (X < sum()) {
      return;
    }

    if (4 < depth) {
      return;
    }

    for (let i = list[depth]; 0 <= i; i--) {
      const newList = [a, b, c, d];
      newList[depth] -= i;
      DFS(...newList, depth + 1);
    }
  };

  DFS(rest, 0, 0, 0, 0, 0);
}).on('close', () => {
  process.exit(0);
});
