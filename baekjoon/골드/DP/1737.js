const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// pibonacci

const DP = Array.from({ length: 1001 }, () => Array(1001).fill(null));

const pibonacci = (n, p) => {
  const m = n - Math.PI * p;

  if (m <= Math.PI) {
    return BigInt('1');
  } else {
    if (DP[n][p] !== null) return BigInt(DP[n][p]);

    DP[n][p] = (
      (pibonacci(n - 1, p) + pibonacci(n, p + 1)) %
      BigInt('1000000000000000000')
    ).toString();
    return BigInt(DP[n][p]);
  }
};

rl.on('line', (line) => {
  console.log(pibonacci(Number(line), 0).toString());
}).on('close', () => {
  process.exit(0);
});
