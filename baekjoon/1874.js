const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N = 0;
const stack = [];
const result = [];
rl.on('line', (line) => {
  if (!N) {
    N = Number(line);
    return;
  }
  stack.push(Number(line));
}).on('close', () => {
  console.log(N, stack);
  for (let i = 1; i <= N; i++) {
    if (stack[i] === i) {
      result.push({ num: i, answer: '-' });
    } else {
      result.push({ num: i, answer: '+' });
    }
  }
  console.log(result);
  process.exit();
});
