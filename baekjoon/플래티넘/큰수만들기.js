const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let input = [];
// https://www.acmicpc.net/problem/16496
rl.on('line', (line) => {
  if (!T) {
    T = Number(line);
    return;
  }

  input.push(...line.split(' ').map(String));
}).on('close', () => {
  const sortInput = input.sort((a, b) => (a + b < b + a ? 1 : -1));

  const answer = sortInput.join('');

  console.log(Number(answer) === 0 ? '0' : answer);
  process.exit();
});
