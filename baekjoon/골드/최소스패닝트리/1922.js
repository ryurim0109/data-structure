const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let N, M;
const input = [];
rl.on('line', (line) => {
  if (!N) {
    N = Number(line);
    return;
  }
  if (!M) {
    M = Number(line);
    return;
  }
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const e = [];
  for (let i = 0; i < M; i++) {
    const [start, end, dist] = input[i];
    e.push([start, end, dist]);
  }
  let parent = Array(N + 1).fill(0);
  for (let i = 1; i <= N; i++) {
    parent[i] = i;
  }

  const find = (x) => {
    if (parent[x] === x) return x;
    return (parent[x] = find(parent[x]));
  };

  const union = (a, b) => {
    a = find(a);
    b = find(b);
    if (a < b) return (parent[b] = a);
    return (parent[a] = b);
  };
  let totalDist = 0;
  e.sort((a, b) => a[2] - b[2]);

  for (let i = 0; i < e.length; i++) {
    const [start, end, dist] = e[i];
    if (find(start) !== find(end)) {
      union(start, end);
      totalDist += dist;
    }
  }
  console.log(totalDist);
  process.exit();
});
