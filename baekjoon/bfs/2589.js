const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [size, ...map] = input;
  const [Y, X] = size.split(' ').map(Number);

  const D = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const BFS = (sy, sx) => {
    const visit = Array.from({ length: Y }, () => Array(X).fill(0));

    const queue = [[sy, sx, 0]];
    let i = 0;
    visit[sy][sx] = 1;

    while (i < queue.length) {
      const [y, x, count] = queue[i];
      i++;

      for (let d = 0; d < D.length; d++) {
        const [dy, dx] = D[d];
        const [ny, nx] = [y + dy, x + dx];
        if (ny < 0 || Y <= ny || nx < 0 || X <= nx) continue;
        if (map[ny][nx] === 'W') continue;
        if (visit[ny][nx]) continue;
        visit[ny][nx] = 1;
        queue.push([ny, nx, count + 1]);
      }
    }
    return queue[queue.length - 1][2];
  };

  let result = 0;
  for (let y = 0; y < Y; y++) {
    for (let x = 0; x < X; x++) {
      if (map[y][x] === 'W') continue;
      const max = BFS(y, x);
      if (result < max) {
        result = max;
      }
    }
  }
  console.log(result);
  process.exit();
});
