const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
const result = [];
rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [T, ...list] = input;

  let H, W;
  let map = [];
  for (let t = 0; t < list.length; t++) {
    if (!H) {
      [H, W] = list[t].split(' ').map(Number);
      continue;
    }
    map.push(list[t]);
    if (map.length === H) {
      solution(H, W, map);
      H = undefined;
      W = undefined;
      map = [];
    }
  }
  console.log(result.join('\n'));
  process.exit();
});

const solution = (h, w, map) => {
  const visit = Array.from({ length: h }, () => Array(w).fill(0));
  const D = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];

  const DFS = (sy, sx) => {
    visit[sy][sx] = 1;
    for (let d = 0; d < D.length; d++) {
      const [dy, dx] = D[d];
      const [ny, nx] = [sy + dy, sx + dx];
      if (ny < 0 || h <= ny || nx < 0 || w <= nx) continue;
      if (map[ny][nx] === '.') continue;
      if (visit[ny][nx]) continue;
      DFS(ny, nx);
    }
  };

  let count = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (map[y][x] === '.') continue;
      if (visit[y][x]) continue;
      count++;
      DFS(y, x);
    }
  }

  result.push(count);
};

const BFS = (sy, sx) => {
  const queue = [[sy, sx]];
  let i = 0;
  visit[sy][sx] = 1;
  while (i < queue.length) {
    const [y, x] = queue[i];
    i++;

    for (let d = 0; d < D.length; d++) {
      const [dy, dx] = D[d];
      const [ny, nx] = [y + dy, x + dx];
      if (ny < 0 || h <= ny || nx < 0 || w <= nx) continue;
      if (visit[ny][nx]) continue;
      if (map[ny][nx] === '.') continue;
      visit[ny][nx] = 1;
      queue.push([ny, nx]);
    }
  }
};
