const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
const result = [];
let ps;
let N, M;

rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
  if (!N) {
    N = Number(line);
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
  }
  if (!M) {
    M = Number(line);
    return;
  }
  const [i, j] = line.split(' ').map(Number);
  result.push(ps[j] - ps[i - 1]);
}).on('close', () => {
  // const [[N], [...list], [M], ...gapList] = input;
  // const ps = [0];
  // for (let i = 0; i < list.length; i++) {
  //   ps.push(ps[i] + list[i]);
  // }
  // for (let y = 0; y < gapList.length; y++) {
  //   const [i, j] = gapList[y];
  //   result.push(ps[j] - ps[i - 1]);
  // }
  console.log(result.join('\n'));
  process.exit();
});
