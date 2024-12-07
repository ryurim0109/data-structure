const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
const result = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  input.pop();

  let w, h;
  let map = [];
  for (let t = 0; t < input.length; t++) {
    if (!w) {
      [w, h] = input[t];
      continue;
    }
    map.push(input[t]);
    if (map.length === h) {
      solution([w, h], map);
      w = undefined;
      h = undefined;
      map = [];
    }
  }
  console.log(result.join('\n'));
  process.exit();
});
const solution = ([w, h], map) => {
  const visit = Array.from({ length: h }, () => Array(w).fill(0));
  const D = [
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const BFS = ([sy, sx]) => {
    const queue = [[sy, sx]];
    visit[sy][sx] = 1;

    let i = 0;
    while (i < queue.length) {
      const [y, x] = queue[i];

      i++;
      for (let d = 0; d < D.length; d++) {
        const [dx, dy] = D[d];
        const [ny, nx] = [y + dy, x + dx];
        if (ny < 0 || h <= ny) continue;
        if (nx < 0 || w <= nx) continue;
        if (visit[ny][nx]) continue;
        if (!map[ny][nx]) continue;
        visit[ny][nx] = 1;
        queue.push([ny, nx]);
      }
    }
  };

  let count = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (visit[y][x]) continue;
      if (!map[y][x]) continue;

      BFS([y, x]);
      count++;
    }
  }

  result.push(count);
};
