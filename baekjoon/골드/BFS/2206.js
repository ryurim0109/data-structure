const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
const input = [];
rl.on('line', (line) => {
  if (!N) {
    [N, M] = line.split(' ').map(Number);
    return;
  }
  input.push(line.split('').map(Number));
}).on('close', () => {
  const visit = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(2).fill(0))
  );

  const D = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  const BFS = () => {
    const queue = [[0, 0, 0, 1]];
    visit[0][0][0] = 1;

    let i = 0;

    while (i < queue.length) {
      const [y, x, broken, dist] = queue[i];
      i++;
      if (y === N - 1 && x === M - 1) {
        return dist;
      }

      for (let d = 0; d < 4; d++) {
        const [dy, dx] = D[d];
        const [ny, nx] = [dy + y, dx + x];

        if (ny < 0 || N <= ny || nx < 0 || M <= nx) continue;
        if (visit[ny][nx][broken]) continue;
        if (input[ny][nx] === 1) {
          if (!broken) {
            visit[ny][nx][1] = 1;
            queue.push([ny, nx, 1, dist + 1]);
          }
        } else {
          visit[ny][nx][broken] = 1;
          queue.push([ny, nx, broken, dist + 1]);
        }
      }
    }
    return -1;
  };
  console.log(BFS());

  process.exit();
});
