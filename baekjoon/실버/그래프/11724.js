const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[N, M], ...map] = input;

  const graph = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
  const visit = Array(N + 1).fill(0);

  for (let i = 0; i < M; i++) {
    const [y, x] = map[i];
    graph[y][x] = 1;
    graph[x][y] = 1;
  }

  const BFS = (c) => {
    const queue = [c];

    visit[c] = 1;
    let i = 0;

    while (i < queue.length) {
      const next = queue[i];
      i++;

      for (let i = 1; i <= N; i++) {
        if (!graph[next][i] || visit[i]) continue;
        visit[i] = 1;
        queue.push(i);
      }
    }
  };

  let count = 0;
  for (let i = 1; i <= N; i++) {
    if (!visit[i]) {
      BFS(i);
      count++;
    }
  }
  console.log(count);
  process.exit();
});
