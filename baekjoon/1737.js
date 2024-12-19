const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// pibonacci

const DP = Array.from({ length: 1001 }, () => Array(1001).fill(0));

const pibonacci = (n, p) => {
  const m = n - Math.PI * p;
  if (m < 0) return 0;
  if (m <= Math.PI) {
    return 1;
  } else {
    if (DP[n][p]) return DP[n][p];

    DP[n][p] =
      (pibonacci(n - 1, p) + pibonacci(n, p + 1)) % 1000000000000000000;
    return DP[n][p];
  }
};

rl.on('line', (line) => {
  console.log(pibonacci(Number(line), 0));
}).on('close', () => {
  process.exit(0);
});
