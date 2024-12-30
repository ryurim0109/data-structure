const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const N = Number(line);

  const mul5 = Math.floor(N / 5);
  const mul25 = Math.floor(N / 25);
  const mul125 = Math.floor(N / 125);

  console.log(mul5 + mul25 + mul125);
}).on('close', () => {
  process.exit();
});
