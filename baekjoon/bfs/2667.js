const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
const map = [];
rl.on('line', (line) => {
  if (!N) {
    N = Number(line);
    return;
  }
  map.push(line.split('').map(Number));
}).on('close', () => {
  const visit = Array.from({ length: N }, () => Array(N).fill(0));
  const D = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const BFS = (sy, sx) => {
    const queue = [[sy, sx]];
    let i = 0;
    let count = 1;

    visit[sy][sx] = 1;

    while (i < queue.length) {
      const [y, x] = queue[i];
      i++;
      for (let d = 0; d < D.length; d++) {
        const [dy, dx] = D[d];
        const [ny, nx] = [y + dy, x + dx];
        if (ny < 0 || N <= ny || nx < 0 || N <= nx) continue;
        if (!map[ny][nx]) continue;
        if (visit[ny][nx]) continue;
        visit[ny][nx] = 1;
        count++;
        queue.push([ny, nx]);
      }
    }
    return count;
  };
  const result = [];

  for (y = 0; y < N; y++) {
    for (x = 0; x < N; x++) {
      if (!map[y][x]) continue;
      if (visit[y][x]) continue;

      result.push(BFS(y, x));
    }
  }
  console.log([result.length].concat(result.sort((a, b) => a - b)).join('\n'));
  process.exit();
});
