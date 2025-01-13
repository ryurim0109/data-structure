const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[N, K], ...list] = input;

  let now = K;
  let count = 0;
  for (let i = N - 1; 0 <= i; i--) {
    if (!now) break;
    const coin = list[i][0];

    if (now < coin) continue;

    const c = Math.floor(now / coin);
    now = now - c * coin;
    count = count + c;
  }
  console.log(count);
  process.exit();
});
