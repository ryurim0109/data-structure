const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 평범한 배낭
const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[N, W], ...things] = input;
  const DP = Array.from({ length: N + 1 }, () => Array(W + 1).fill(0));

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= W; j++) {
      if (j < things[i - 1][0]) {
        DP[i][j] = DP[i - 1][j];
      } else {
        DP[i][j] = Math.max(
          DP[i - 1][j],
          things[i - 1][1] + DP[i - 1][j - things[i - 1][0]]
        );
      }
    }
  }

  console.log(DP[N][W]);

  process.exit(0);
});
