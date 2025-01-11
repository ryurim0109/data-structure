const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N = 0;
const stack = [];
const result = [];
const tempStack = [];
let curIdx = 1;

rl.on('line', (line) => {
  if (!N) {
    N = Number(line);
    return;
  }
  stack.push(Number(line));
}).on('close', () => {
  let idx = 0;

  while (idx < N) {
    if (stack[idx] === tempStack[tempStack.length - 1] && tempStack.length) {
      tempStack.pop();
      result.push('-');
      idx++;
    } else if (curIdx <= N) {
      tempStack.push(curIdx);
      result.push('+');
      curIdx++;
    } else {
      console.log('NO');
      process.exit(0);
    }
  }
  console.log(result.join('\n'));
  process.exit();
});
