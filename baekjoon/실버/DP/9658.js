const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 돌 게임 4

rl.on('line', (line) => {
  const N = Number(line);

  const DP = Array(N + 1).fill(false);
  DP[1] = false;
  DP[2] = true;
  DP[3] = false;
  DP[4] = true;
  for (let i = 5; i <= N; i++) {
    DP[i] = !DP[i - 1] || !DP[i - 3] || !DP[i - 4];
  }
  console.log(DP[N] ? 'SK' : 'CY');
}).on('close', () => {
  process.exit();
});
