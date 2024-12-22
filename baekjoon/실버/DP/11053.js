const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//lis 가장 긴 증가하는 부분 수열
// longest increasing subsequence

let n;
rl.on('line', (line) => {
  if (!n) {
    n = Number(line);
    return;
  }

  const DP = Array(n + 1).fill(0);
  const list = line.split(' ').map(Number);

  for (let i = 1; i <= n; i++) {
    const prev = list[i - 1];
    if (!DP[i]) {
      DP[i] = 1;
    }
    const count = DP[i];
    for (let j = i + 1; j <= n; j++) {
      if (prev < list[j - 1]) {
        DP[j] = Math.max(DP[j], count + 1);
      }
    }
  }
  console.log(Math.max(...DP));
}).on('close', () => {
  process.exit();
});
