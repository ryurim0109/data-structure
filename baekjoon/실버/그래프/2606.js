const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[C], [N], ...map] = input;

  const graph = Array.from({ length: C + 1 }, () => Array(C + 1).fill(0));

  for (let i = 0; i < N; i++) {
    const [y, x] = map[i];
    graph[y][x] = 1;
    graph[x][y] = 1;
  }
  const visit = Array(C + 1).fill(0);

  const BFS = (c) => {
    const queue = [c];
    visit[c] = 1;

    let i = 0;
    let count = 0;
    while (i < queue.length) {
      const ny = queue[i];
      i++;

      for (let i = 1; i <= graph.length; i++) {
        if (!graph[ny][i] || visit[i]) continue;

        visit[i] = 1;
        queue.push(i);
        count++;
      }
    }
    return count;
  };

  console.log(BFS(1));
  process.exit();
});
