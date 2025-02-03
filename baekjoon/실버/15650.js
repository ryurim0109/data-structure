const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const result = [];
rl.on('line', (line) => {
  const [n, m] = line.split(' ').map(Number);

  function rec(list, i, dep) {
    for (let x = i; x <= n; x++) {
      if (dep + 1 === m) {
        result.push([...list, x].join(' '));
        continue;
      }
      rec([...list, x], x + 1, dep + 1);
    }
  }
  rec([], 1, 0);

  console.log(result.join('\n'));
}).on('close', () => {
  process.exit();
});
