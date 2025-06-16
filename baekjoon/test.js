const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// https://www.acmicpc.net/problem/2252
// 줄 세우기
rl.on('line', (line) => {}).on('close', () => {
  process.exit();
});
