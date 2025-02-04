const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const result = [];
let n, m;
rl.on('line', (line) => {
  if (!n) {
    [n, m] = line.split(' ').map(Number);
    return;
  }

  const numList = line
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  const used = new Array(n).fill(false);

  function rec(list, dep) {
    if (dep === m) {
      result.push(list.join(' '));
      return;
    }
    for (let i = 0; i < n; i++) {
      if (!used[i]) {
        used[i] = true;
        rec([...list, numList[i]], dep + 1);
        used[i] = false;
      }
    }
  }
  rec([], 0);

  console.log(result.join('\n'));
}).on('close', () => {
  process.exit();
});
