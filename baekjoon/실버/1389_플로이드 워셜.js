const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let graph;
let N, M;
rl.on('line', (line) => {
  if (!N) {
    [N, M] = line.split(' ').map(Number);
    graph = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));
    for (let i = 1; i <= N; i++) graph[i][i] = 0;
    return;
  }
  const [a, b] = line.split(' ').map(Number);

  graph[a][b] = 1;
  graph[b][a] = 1;
  M--;
  if (M === 0) rl.close();
}).on('close', () => {
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }
  let min = Infinity;
  let result = 0;

  for (let i = 1; i <= N; i++) {
    const bacon = graph[i].slice(1).reduce((prev, cur) => prev + cur, 0);

    if (bacon < min) {
      min = bacon;
      result = i;
    }
  }
  console.log(result);
  process.exit();
});
