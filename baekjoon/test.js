const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const [A, B] = line.split(' ').map(Number);

  console.log(A / B);
}).on('close', () => {
  process.exit();
});
