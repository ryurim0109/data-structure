const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
const input = [];
const queue = [];
rl.on('line', (line) => {
  if (!N) {
    [M, N] = line.split(' ').map(Number);
    return;
  }
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (input[y][x] === 1) {
        queue.push([y, x]);
      }
    }
  }

  const BFS = () => {
    const D = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];

    let i = 0;

    let isDone = true;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (input[y][x] === 0) {
          isDone = false;
          break;
        }
      }
      if (!isDone) break;
    }
    if (isDone) return 0;

    while (i < queue.length) {
      const [y, x] = queue[i];
      i++;

      for (let d = 0; d < 4; d++) {
        const [dy, dx] = D[d];
        const [ny, nx] = [dy + y, dx + x];

        if (ny < 0 || N <= ny || nx < 0 || M <= nx) continue;
        if (input[ny][nx] === 0) {
          input[ny][nx] = input[y][x] + 1;

          queue.push([ny, nx]);
        }
      }
    }

    let max = 0;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (input[y][x] === 0) {
          return -1;
        }
        if (max < input[y][x]) {
          max = input[y][x];
        }
      }
    }
    return max - 1;
  };

  console.log(BFS());

  process.exit();
});
