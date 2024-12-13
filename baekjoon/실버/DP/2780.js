const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * 비밀번호
 * DP 테이블 3차원 설계
 */
const result = [];
let T;
rl.on('line', (line) => {
  if (!T) {
    T = Number(line);
    return;
  }

  result.push(solution(Number(line)));
}).on('close', () => {
  console.log(result.join('\n'));
  process.exit();
});

const solution = (n) => {
  const D = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const map = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['0']];

  const DP = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => Array(n).fill(0))
  );
  const DFS = (sy, sx, depth) => {
    if (depth === n) return 1;
    let count = 0;
    for (let d = 0; d < D.length; d++) {
      const [dy, dx] = D[d];
      const [ny, nx] = [sy + dy, sx + dx];
      if (ny < 0 || 4 <= ny || nx < 0 || 3 <= nx) continue;
      if (!map[ny][nx]) continue;
      if (!DP[ny][nx][depth]) {
        DP[ny][nx][depth] = DFS(ny, nx, depth + 1) % 1234567;
      }
      count += DP[ny][nx][depth];
    }
    return count;
  };

  let max = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      max += DFS(y, x, 1);
    }
  }
  return max % 1234567;
};
