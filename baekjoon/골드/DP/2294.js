const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 동전
const coins = [];
let n, k;
rl.on('line', (line) => {
  if (!n) {
    [n, k] = line.split(' ').map(Number);
    return;
  }
  coins.push(Number(line));
}).on('close', () => {
  const DP = Array(k + 1).fill(999999999);
  DP[0] = 0;

  for (let i = 1; i <= k; i++) {
    for (let j = 0; j < n; j++) {
      if (i < coins[j]) continue;
      if (DP[i] < DP[i - coins[j]] + 1) continue;
      DP[i] = DP[i - coins[j]] + 1;
    }
  }
  const min = DP.pop();
  console.log(min === 999999999 ? -1 : min);
  process.exit();
});
