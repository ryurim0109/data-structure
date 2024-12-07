const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 1;
let result = 666;
rl.on('line', (line) => {
  while (Number(line) !== count) {
    result++;
    if (String(result).includes('666')) {
      count++;
    }
  }
}).on('close', () => {
  console.log(result);
  process.exit();
});
