const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const gcd = (a, b) => {
  if (b > 0) {
    return gcd(b, a % b);
  }
  return a;
};

const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

rl.on('line', (line) => {
  const [A, B] = line.split(' ').map(Number);
  console.log(gcd(A, B));
  console.log(lcm(A, B));
}).on('close', () => {
  process.exit();
});
