const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
/**
 *
 * 3 4
 * DLLL
 * DRLU
 * RRRU **/

let N, M;
const input = [];
rl.on('line', (line) => {
  if (!N) {
    [N, M] = line.split(' ').map(Number);
    return;
  }
  input.push(line.split(''));
}).on('close', () => {
  const visit = Array.from({ length: N }, () => Array(M).fill(0));
  let groupCount = 0;
  const dirMap = {
    L: 0,
    R: 1,
    U: 2,
    D: 3,
  };
  const D = [
    [0, -1], //L
    [0, 1], //R
    [-1, 0], // U
    [1, 0], //D
  ];

  const DFS = (sy, sx) => {
    visit[sy][sx] = -1;

    dir = dirMap[input[sy][sx]];

    const [dy, dx] = D[dir];
    const [ny, nx] = [dy + sy, dx + sx];
    if (visit[ny][nx] === -1) {
      groupCount += 1;
      visit[sy][sx] = groupCount;
      return groupCount;
    }

    if (visit[ny][nx] > 0) {
      visit[sy][sx] = visit[ny][nx];
      return visit[sy][sx];
    }

    visit[sy][sx] = DFS(ny, nx);
    return visit[sy][sx];
  };

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (!visit[y][x]) {
        DFS(y, x);
      }
    }
  }
  console.log(groupCount);
  process.exit();
});
