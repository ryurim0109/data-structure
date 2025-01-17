const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
const input = [];
rl.on('line', (line) => {
  if (!N) {
    [N, M] = line.split(' ').map(Number);
    return;
  }
  input.push(line.split('').map(Number));
}).on('close', () => {
  const visit = Array.from({ length: N }, () => Array(M).fill(0));

  const D = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const BFS = (sy, sx) => {
    const queue = [[sy, sx]];

    let i = 0;

    visit[sy][sx] = 1;
    while (i < queue.length) {
      const [y, x] = queue[i];

      i++;

      for (let d = 0; d < 4; d++) {
        const [dy, dx] = D[d];
        const [ny, nx] = [y + dy, x + dx];

        if (ny < 0 || N <= ny || nx < 0 || M <= nx) continue;

        if (visit[ny][nx]) continue;
        if (!input[ny][nx]) continue;
        visit[ny][nx] = visit[y][x] + 1;
        queue.push([ny, nx]);
      }
    }
    return visit[N - 1][M - 1];
  };
  console.log(BFS(0, 0));
  process.exit();
});
