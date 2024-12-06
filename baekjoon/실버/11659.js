const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let ps;
const result = [];
rl.on('line', (line) => {
  if (!N) {
    [N, M] = line.split(' ').map(Number);
    return;
  }
  if (!ps) {
    ps = line.split(' ').reduce(
      (prev, cur) => {
        prev.push(prev[prev.length - 1] + Number(cur));
        return prev;
      },
      [0]
    );
    return;
  }

  const [i, j] = line.split(' ').map(Number);

  result.push(ps[j] - ps[i - 1]);
}).on('close', () => {
  console.log(result.join('\n'));
  process.exit();
});
