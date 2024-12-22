const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 돌 게임

rl.on('line', (line) => {
  const N = Number(line);

  const DP = Array(N + 1).fill(false);
  DP[1] = true;
  DP[2] = false;
  DP[3] = true;
  DP[4] = false;
  for (let i = 5; i <= N; i++) {
    DP[i] = !DP[i - 1] || !DP[i - 3];
  }
  console.log(DP[N] ? 'SK' : 'CY');
}).on('close', () => {
  process.exit();
});
