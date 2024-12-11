const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[n], ...list] = input;

  let prev = Array(n).fill(0);
  let cur = Array(n).fill(0);
  prev[0] = list[0][0];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < list[i].length; j++) {
      const left = j === 0 ? 0 : prev[j - 1];
      const right = j === list[i].length - 1 ? 0 : prev[j];

      cur[j] = Math.max(left, right) + list[i][j];
    }
    [prev, cur] = [cur, prev];
  }
  console.log(Math.max(...prev));
  process.exit();
});
