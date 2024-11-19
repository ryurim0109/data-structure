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
      rec([...list, x], x, dep + 1);
    }
  }
  rec([], 1, 0);

  console.log(result.join('\n'));
}).on('close', () => {
  process.exit();
});
// for (let i = 0; i < m; i++) {}
// for (let i = 1; i <= n; i++) {
//   const cur = i.toString();
//   const list = [];
//   list.push(i);
//   for (let j = i; j <= n; j++) {
//     // result.push(cur + ` ${j}`);
//     result.push([...list, j].join(' '));
//   }
// }
