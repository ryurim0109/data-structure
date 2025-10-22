const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// https://www.acmicpc.net/problem/13460
// 구슬탈출  2
let N, M;
const graph = [];
rl.on('line', (line) => {
  if (!N) {
    [N, M] = line.split(' ').map(Number);
    return;
  }
  graph.push(line.split(''));
}).on('close', () => {
  console.log(N, M);
  console.log(graph);
  process.exit();
});
