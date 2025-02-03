const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const [A, B, C] = line.split(' ').map(BigInt);

  const power = (base, exponent) => {
    if (exponent === 1n) {
      return base % C;
    }
    if (exponent % 2n === 0n) {
      const half_power = power(base, exponent / 2n) % C;
      return (half_power * half_power) % C;
    }

    const half_power = power(base, (exponent - 1n) / 2n) % C;
    return (((half_power * half_power) % C) * base) % C;
  };
  console.log(power(A, B).toString());
}).on('close', () => {
  process.exit();
});
