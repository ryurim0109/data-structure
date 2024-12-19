const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 돌 게임 6

rl.on('line', (line) => {
  const N = Number(line);

  const winner = [false, true, false, true, true, true, true][N % 7];

  console.log(winner ? 'SK' : 'CY');
}).on('close', () => {
  process.exit();
});
