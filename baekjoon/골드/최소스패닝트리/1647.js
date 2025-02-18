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
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const e = [];
  for (let i = 0; i < M; i++) {
    const [start, end, weight] = input[i];
    e.push([start, end, weight]);
  }

  let parent = Array.from({ length: N + 1 }).fill(0);
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

  let totalCost = 0;
  const selectedEdges = [];

  e.sort((a, b) => a[2] - b[2]);

  for (let i = 0; i < e.length; i++) {
    const [start, end, weight] = e[i];
    if (find(start) !== find(end)) {
      union(start, end);
      totalCost += weight;
      selectedEdges.push(weight);
    }
  }

  const max = Math.max(...selectedEdges);
  console.log(totalCost - max);
  process.exit();
});
