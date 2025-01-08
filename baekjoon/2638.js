const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
let input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[H, W], ...map] = input;

  const D = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  let cheeses = 0;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (map[y][x]) {
        cheeses++;
      }
    }
  }

  const isMolten = (y, x) => {
    if (!map[y][x]) return false;
    let cnt = 0;

    for (let d = 0; d < 4; d++) {
      const [dy, dx] = D[d];
      const [ny, nx] = [y + dy, x + dx];

      if (map[ny][nx] === null) {
        cnt++;
      }
    }

    return 2 <= cnt;
  };

  const checkOutside = () => {
    const visit = Array.from({ length: H }, () => Array(W).fill(0));

    const queue = [[0, 0]];
    visit[0][0] = 1;
    map[0][0] = null;
    let i = 0;

    while (i < queue.length) {
      const [cy, cx] = queue[i];
      i++;

      for (let d = 0; d < 4; d++) {
        const [dy, dx] = D[d];
        const [ny, nx] = [cy + dy, cx + dx];

        if (ny < 0 || H <= ny || nx < 0 || W <= nx) continue;

        if (visit[ny][nx]) continue;
        if (map[ny][nx]) continue;
        visit[ny][nx] = 1;
        map[ny][nx] = null;
        queue.push([ny, nx]);
      }
    }
  };
  const BFS = () => {
    const visit = Array.from({ length: H }, () => Array(W).fill(0));

    const moltenList = [];

    const queue = [[0, 0]];
    visit[0][0] = 1;
    let i = 0;

    while (i < queue.length) {
      const [cy, cx] = queue[i];
      i++;

      for (let d = 0; d < 4; d++) {
        const [dy, dx] = D[d];
        const [ny, nx] = [cy + dy, cx + dx];

        if (ny < 0 || H <= ny || nx < 0 || W <= nx) continue;

        if (visit[ny][nx]) continue;
        visit[ny][nx] = 1;
        if (isMolten(ny, nx)) {
          moltenList.push([ny, nx]);
          continue;
        }

        queue.push([ny, nx]);
      }
    }

    cheeses -= moltenList.length;
    moltenList.forEach(([y, x]) => (map[y][x] = 0));
    count++;
  };
  while (cheeses) {
    checkOutside();
    BFS();
  }
  console.log(count);
  process.exit();
});
