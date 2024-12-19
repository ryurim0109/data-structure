const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 피보나치 함수
let T;
const DP = Array(40).fill(0);
const result = [];
const fibonacci = (n) => {
  if (DP[n]) return DP[n];
  if (n === 0) return [1, 0];
  if (n === 1) return [0, 1];
  const [z1, o1] = fibonacci(n - 1);
  const [z2, o2] = fibonacci(n - 2);
  DP[n] = [z1 + z2, o1 + o2];
  return DP[n];
};

rl.on('line', (line) => {
  if (!T) {
    T = Number(line);
    return;
  }

  const n = Number(line);
  result.push(fibonacci(n).join(' '));
}).on('close', () => {
  console.log(result.join('\n'));
  process.exit(0);
});
