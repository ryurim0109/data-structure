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
  const [[T], ...list] = input;
  const D = [
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, -1],
    [2, 1],
    [-1, -2],
    [1, -2],
  ];

  const BFS = ([l], [sy, sx], [ey, ex]) => {
    if (sy === ey && sx === ex) {
      result.push(0);
      return;
    }
    const visit = Array.from({ length: l }, () => Array(l).fill(0));
    const queue = [[sy, sx, 0]];
    let i = 0;
    while (i < queue.length) {
      const [y, x, count] = queue[i];
      visit[y][x] = 1;
      i++;
      for (let d = 0; d < D.length; d++) {
        const [dy, dx] = D[d];
        const [ny, nx] = [y + dy, x + dx];
        if (ny < 0 || l <= ny || nx < 0 || l <= nx) continue;
        if (visit[ny][nx]) continue;
        visit[ny][nx] = 1;
        if (ny === ey && nx === ex) {
          result.push(count + 1);
          return;
        }
        queue.push([ny, nx, count + 1]);
      }
    }
  };
  for (let t = 0; t < T; t++) {
    BFS(...list.slice(t * 3, (t + 1) * 3));
  }
  console.log(result.join('\n'));
  process.exit();
});
