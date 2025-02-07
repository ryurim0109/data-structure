const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, m;
let result = [];

rl.on('line', (line) => {
  if (!n) {
    [n, m] = line.split(' ').map(Number);
    return;
  }

  const numList = line
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);
  const visited = new Array(n).fill(false);

  function makeSequence(seq) {
    if (seq.length === m) {
      result.push(seq.join(' '));
      return;
    }

    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        visited[i] = true;
        makeSequence([...seq, numList[i]]);
        visited[i] = false;
      }
    }
  }

  makeSequence([]);
  console.log([...new Set(result)].join('\n'));
}).on('close', () => {
  process.exit();
});
