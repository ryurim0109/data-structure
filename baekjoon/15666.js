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

  const numList = [...new Set(line.split(' ').map(Number))].sort(
    (a, b) => a - b
  );

  function rec(list, i, dep) {
    for (let x = i; x < numList.length; x++) {
      if (dep + 1 === m) {
        result.push([...list, numList[x]].join(' '));
        continue;
      }
      rec([...list, numList[x]], x, dep + 1);
    }
  }
  rec([], 0, 0);

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
