const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * 
파이프 옮기기1 
시작점 몇개인지!
DP 테이블
 */
const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[N], ...map] = input;
  const DP = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => Array(3).fill(null))
  );
  const D = [
    [0, 1],
    [1, 0],
    [1, 1], //대각선
  ];
  const DFS = (y, x, t) => {
    let count = 0;
    if (y === N - 1 && x === N - 1) {
      return 1;
    }
    for (let d = 0; d < D.length; d++) {
      if (t === 0 && d === 1) continue;
      if (t === 1 && d === 0) continue;
      const [dy, dx] = D[d];
      const [ny, nx] = [y + dy, x + dx];
      if (d === 2) {
        const [hy, hx] = [y, x + 1];
        const [vy, vx] = [y + 1, x];
        if (N <= hx || N <= vy) continue;
        if (map[hy][hx] || map[vy][vx]) continue;
      }
      if (N <= ny || N <= nx) continue;
      if (map[ny][nx]) continue;
      if (DP[ny][nx][d] === null) {
        DP[ny][nx][d] = DFS(ny, nx, d);
      }
      count += DP[ny][nx][d];
    }
    return count;
  };
  console.log(DFS(0, 1, 0));
  process.exit(0);
});
