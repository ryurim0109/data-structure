const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let N, M;
const map = [];
const input = [];
const result = [];
rl.on('line', (line) => {
  if (!N) {
    [N, M] = line.split(' ').map(Number);
    return;
  }
  if (map.length < N) {
    map.push(line.split(' ').map(Number));
    return;
  }

  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const ps = Array.from(Array(N + 1), () => Array(N + 1).fill(0));
  for (let y = 1; y <= N; y++) {
    for (let x = 1; x <= N; x++) {
      const cur = map[y - 1][x - 1];
      ps[y][x] = cur + ps[y - 1][x] + ps[y][x - 1] - ps[y - 1][x - 1];
    }
  }

  for (let i = 0; i < input.length; i++) {
    const [y1, x1, y2, x2] = input[i];
    result.push(
      ps[y2][x2] - ps[y1 - 1][x2] - ps[y2][x1 - 1] + ps[y1 - 1][x1 - 1]
    );
  }
  console.log(result.join('\n'));
  process.exit(0);
});
