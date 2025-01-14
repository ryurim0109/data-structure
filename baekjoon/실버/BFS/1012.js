const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;

let M, N, K;
let input = [];
const result = [];
rl.on('line', (line) => {
  if (!T) {
    T = Number(line);
    return;
  }

  if (!M) {
    [M, N, K] = line.split(' ').map(Number);
    return;
  }
  input.push(line.split(' ').map(Number));

  if (input.length === K) {
    solution();
    M = N = K = undefined;
    input = [];
  }
}).on('close', () => {
  console.log(result.join('\n'));
  process.exit();
});

const solution = () => {
  const graph = Array.from({ length: N }, () => Array(M).fill(0));
  const visit = Array.from({ length: N }, () => Array(M).fill(0));
  for (let i = 0; i < K; i++) {
    const [x, y] = input[i];
    graph[y][x] = 1;
  }
  const BFS = (sy, sx) => {
    const D = [
      [0, -1],
      [0, 1],
      [1, 0],
      [-1, 0],
    ];

    const queue = [[sy, sx]];

    let i = 0;

    while (i < queue.length) {
      const [y, x] = queue[i];
      i++;
      visit[y][x] = 1;

      for (let d = 0; d < 4; d++) {
        const [dy, dx] = D[d];

        const [ny, nx] = [y + dy, x + dx];

        if (ny < 0 || N <= ny || nx < 0 || M <= nx) continue;
        if (visit[ny][nx]) continue;
        if (!graph[ny][nx]) continue;

        visit[ny][nx] = 1;
        queue.push([ny, nx]);
      }
    }
  };

  let wormCount = 0;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (graph[y][x] === 1 && !visit[y][x]) {
        BFS(y, x);
        wormCount++;
      }
    }
  }
  result.push(wormCount);
};
