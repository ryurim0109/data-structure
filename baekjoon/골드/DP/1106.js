const { off } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
// 호텔
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[c, n], ...list] = input;

  const DP = Array(c + 100).fill(9999999);
  DP[0] = 0;
  let min = 9999999;

  for (let i = 0; i < DP.length; i++) {
    for (let j = 0; j < n; j++) {
      const [cost, people] = list[j];

      if (i - people < 0) continue;
      DP[i] = Math.min(DP[i], DP[i - people] + cost);

      if (c <= i && DP[i] < min) {
        min = DP[i];
      }
    }
  }
  console.log(min);
});
