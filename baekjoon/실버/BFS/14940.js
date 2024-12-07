const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
const blocks = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[Y, X], ...map] = input;
  let [sy, sx] = [0, 0];
  Map: for (let y = 0; y < Y; y++) {
    for (let x = 0; x < X; x++) {
      if (map[y][x] === 2) {
        [sy, sx] = [y, x];
      }
      if (map[y][x] === 0) {
        blocks.push([y, x]);
      }
    }
  }

  const D = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];

  const visit = Array.from({ length: Y }, () => Array(X).fill(null));
  const queue = [[sy, sx, 0]];
  visit[sy][sx] = 0;
  let i = 0;
  while (i < queue.length) {
    const [y, x, count] = queue[i];

    i++;

    for (let d = 0; d < D.length; d++) {
      const [dy, dx] = D[d];
      const [ny, nx] = [y + dy, x + dx];

      if (ny < 0 || Y <= ny || nx < 0 || X <= nx) continue;
      if (map[ny][nx] === 0) {
        visit[ny][nx] = 0;
        continue;
      }
      if (visit[ny][nx] !== null) continue;

      visit[ny][nx] = count + 1;
      queue.push([ny, nx, count + 1]);
    }
  }

  i = 0;
  while (i < blocks.length) {
    const [y, x] = blocks[i];

    i++;
    for (let d = 0; d < D.length; d++) {
      const [dy, dx] = D[d];
      const [ny, nx] = [y + dy, x + dx];

      if (ny < 0 || Y <= ny || nx < 0 || X <= nx) continue;
      if (map[ny][nx] === 0) {
        visit[ny][nx] = 0;
        continue;
      }
      if (visit[ny][nx] !== null) continue;

      visit[ny][nx] = -1;
      blocks.push([ny, nx]);
    }
  }
  console.log(visit.map((el) => el.join(' ')).join('\n'));
  process.exit();
});
