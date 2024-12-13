const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
const result = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[T], ...list] = input;

  for (let t = 0; t < T; t++) {
    solution(...list.slice(t * 3, (t + 1) * 3));
  }
  console.log(result.join('\n'));
  process.exit();
});
const solution = ([n], row1, row2) => {
  const map = [row1, row2];

  let prev = Array(3).fill(0);
  let next = Array(3).fill(0);

  for (let i = 1; i <= n; i++) {
    const r1 = prev[0];
    const r2 = prev[1];
    const r3 = prev[2];

    next[0] = Math.max(r2, r3) + map[0][i - 1];
    next[1] = Math.max(r1, r3) + map[1][i - 1];
    next[2] = Math.max(r1, r2, r3);
    [prev, next] = [next, prev];
  }

  result.push(Math.max(...prev));
};
