const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
const resultDfs = [];
const resultBfs = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[N, M, V], ...map] = input;

  const graph = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

  for (let i = 0; i < M; i++) {
    const [y, x] = map[i];

    graph[y][x] = 1;
    graph[x][y] = 1;
  }

  const visit1 = Array(N + 1).fill(0);
  const visit2 = Array(N + 1).fill(0);

  const DFS = (v) => {
    if (visit1[v]) return;
    visit1[v] = 1;
    resultDfs.push(v);

    for (let i = 1; i <= graph.length; i++) {
      if (!graph[v][i]) continue;
      DFS(i);
    }
  };

  const BFS = (v) => {
    const queue = [v];
    visit2[v] = 1;
    resultBfs.push(v);
    queue.push(v);

    let i = 0;
    while (i < queue.length) {
      const ny = queue[i];
      i++;

      for (let i = 1; i <= graph.length; i++) {
        if (!graph[ny][i] || visit2[i]) continue;
        visit2[i] = 1;
        resultBfs.push(i);
        queue.push(i);
      }
    }
  };
  DFS(V);
  BFS(V);
  console.log(resultDfs.join(' '));
  console.log(resultBfs.join(' '));
  process.exit();
});
