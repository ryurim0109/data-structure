const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[n], list] = input;

  const DP = Array.from({ length: n }, () => Array(n).fill(-1));

  const pal = (s, e) => {
    if (s > e) {
      return 0;
    }

    if (s === e) {
      return 0;
    }

    if (DP[s][e] !== -1) {
      return DP[s][e];
    }

    if (list[s] === list[e]) {
      DP[s][e] = pal(s + 1, e - 1);
    } else {
      DP[s][e] = Math.min(pal(s + 1, e), pal(s, e - 1)) + 1;
    }

    return DP[s][e];
  };

  console.log(pal(0, n - 1));
  process.exit();
});
