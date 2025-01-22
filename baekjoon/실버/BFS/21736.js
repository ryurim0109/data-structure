const { BADFLAGS } = require('dns');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
let N, M;
rl.on('line', (line) => {
  if (!N) {
    [N, M] = line.split(' ').map(Number);
    return;
  }
  input.push(line.split(''));
}).on('close', () => {
  const visit = Array.from({ length: N }, () => Array(M).fill(0));

  const D = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];

  const BFS = (sy, sx) => {
    const queue = [[sy, sx]];
    visit[sy][sx] = 1;

    let i = 0;
    let count = 0;
    while (i < queue.length) {
      const [y, x] = queue[i];
      i++;
      for (let d = 0; d < D.length; d++) {
        const [dy, dx] = D[d];
        const [ny, nx] = [dy + y, dx + x];

        if (ny < 0 || N <= ny || nx < 0 || M <= nx) continue;

        if (visit[ny][nx]) continue;
        if (input[ny][nx] === 'X') continue;
        if (input[ny][nx] === 'P') {
          count++;
        }
        visit[ny][nx] = 1;
        queue.push([ny, nx]);
      }
    }
    return count;
  };

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      const cur = input[y][x];
      if (cur === 'I') {
        const count = BFS(y, x);
        console.log(count ? count : 'TT');
      }
    }
  }
  process.exit();
});
