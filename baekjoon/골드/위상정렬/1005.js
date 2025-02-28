const { time } = require('console');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let N, K;
let input = [];
let count = 0;
let rules = [];
const result = [];

const solution = (target) => {
  let graph = Array.from(Array(N + 1), () => []);
  let indegrees = Array(N + 1).fill(0);
  let dp = Array(N + 1).fill(0);

  for (let i = 0; i < K; i++) {
    const [start, end] = input[i];
    graph[start].push(end);
    indegrees[end]++;
  }

  for (let i = 1; i <= N; i++) {
    dp[i] = rules[i - 1];
  }

  let queue = [];
  let i = 0;
  for (let i = 1; i <= N; i++) {
    if (indegrees[i] === 0) {
      queue.push(i);
    }
  }

  while (i < queue.length) {
    const current = queue[i];
    i++;

    for (let j = 0; j < graph[current].length; j++) {
      const next = graph[current][j];
      dp[next] = Math.max(dp[next], dp[current] + rules[next - 1]);
      indegrees[next]--;

      if (!indegrees[next]) {
        queue.push(next);
      }
    }
  }
  result.push(dp[target]);
};
rl.on('line', (line) => {
  if (!T) {
    T = Number(line);
    return;
  }
  if (count === T) process.exit(0);
  if (!K) {
    [N, K] = line.split(' ').map(Number);
    return;
  }
  if (!rules.length) {
    rules = line.split(' ').map(Number);
    return;
  }
  if (input.length < K) {
    input.push(line.split(' ').map(Number));
    return;
  }
  solution(Number(line));
  count++;
  input = [];
  rules = [];
  N = null;
  K = null;
}).on('close', () => {
  console.log(result.join('\n'));
  process.exit();
});
