//9205 - 맥주 마시면서 걸어가기
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let t;
let n = undefined;
let input = [];
const result = [];
const solution = () => {
  const [ey, ex] = input.pop();
  const [[sy, sx], ...marts] = input;

  const visit = Array(marts.length).fill(0);
  const dfs = (cy, cx, idx) => {
    if (Math.abs(ey - cy) + Math.abs(ex - cx) <= 1000) {
      return true;
    }
    if (idx !== null) {
      visit[idx] = 1;
    }
    for (let i = 0; i < marts.length; i++) {
      if (visit[i]) continue;
      if (i === idx) continue;
      const [my, mx] = marts[i];
      const distance = Math.abs(my - cy) + Math.abs(mx - cx);
      if (1000 < distance) continue;
      const canGo = dfs(my, mx, i);
      if (canGo) return canGo;
    }
  };

  const canGo = dfs(sy, sx, null);

  result.push(canGo ? 'happy' : 'sad');
};
rl.on('line', (line) => {
  if (!t) {
    t = Number(line);
    return;
  }
  if (n === undefined) {
    n = Number(line);
    return;
  }
  input.push(line.split(' ').map(Number));
  if (input.length === n + 2) {
    solution();
    n = undefined;
    input = [];
  }
}).on('close', () => {
  console.log(result.join('\n'));
  process.exit();
});
