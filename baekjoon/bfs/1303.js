const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
let w, h;
rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, ...map] = input;
  if (!w) {
    [w, h] = N.split(' ').map(Number);
  }

  const visit = Array.from({ length: h }, () => Array(w).fill(0));

  const D = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];
  let white = 0;
  let blue = 0;
  const BFS = (sy, sx) => {
    const queue = [[sy, sx]];

    let count = 1;
    let i = 0;
    while (i < queue.length) {
      const [y, x] = queue[i];
      i++;
      visit[y][x] = 1;
      for (let d = 0; d < D.length; d++) {
        const [dy, dx] = D[d];
        const [ny, nx] = [y + dy, x + dx];
        if (ny < 0 || h <= ny || nx < 0 || w <= nx) continue;
        if (visit[ny][nx]) continue;
        if (map[ny][nx] !== map[sy][sx]) continue;

        visit[ny][nx] = 1;
        queue.push([ny, nx]);
        count++;
      }
    }

    return count * count;
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!visit[y][x]) {
        if (map[y][x] === 'W') {
          white += BFS(y, x);
        } else {
          blue += BFS(y, x);
        }
      }
    }
  }
  console.log(white, blue);

  process.exit();
});
