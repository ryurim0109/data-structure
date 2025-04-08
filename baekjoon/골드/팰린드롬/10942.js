const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [0];
const result = [];
let DP;
const solution = () => {
  for (let l = 2; l <= N - 1; l++) {
    for (let s = 1; s <= N - l; s++) {
      const e = s + l;
      if (input[s] === input[e] && DP[s + 1][e - 1]) {
        DP[s][e] = 1;
      }
    }
  }
};

rl.on('line', (line) => {
  if (!N) {
    N = Number(line);
    DP = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
    return;
  }
  if (input.length !== N + 1) {
    input.push(...line.split(' ').map(Number));

    for (let i = 1; i <= N; i++) {
      DP[i][i] = 1;
    }
    for (let i = 1; i < N; i++) {
      if (input[i] === input[i + 1]) {
        DP[i][i + 1] = 1;
      }
    }

    solution();
    return;
  }
  if (!M) {
    M = Number(line);
    return;
  }

  const [S, E] = line.split(' ').map(Number);
  result.push(DP[S][E]);
}).on('close', () => {
  console.log(result.join('\n'));
  process.exit();
});
