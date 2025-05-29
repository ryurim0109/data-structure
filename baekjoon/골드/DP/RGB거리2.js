const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[N], ...houses] = input;
  const DP = Array.from({ length: 3 }, () =>
    Array.from({ length: N }, () => Array(3).fill(null))
  );

  const fn = (start, deps, cur) => {
    if (deps < 0) return 0;
    if (DP[start][deps][cur]) return DP[start][deps][cur];

    const list = [];
    for (let i = 0; i < 3; i++) {
      if (cur === i) continue;
      if (deps === 1 && start === i) continue;
      list.push(fn(start, deps - 1, i));
    }
    DP[start][deps][cur] = Math.min(...list) + houses[deps][cur];
    return DP[start][deps][cur];
  };

  const result = Math.min(fn(0, N - 1, 0), fn(1, N - 1, 1), fn(2, N - 1, 2));
  console.log(result);

  process.exit();
});
