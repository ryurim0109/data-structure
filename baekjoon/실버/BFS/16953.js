const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let A, B;
rl.on('line', (line) => {
  [A, B] = line.split(' ').map(Number);
}).on('close', () => {
  const queue = [[B, 0]];
  let i = 0;
  while (queue[i][0] !== 0) {
    const [cur, count] = queue[i];
    if (cur === A) {
      console.log(count + 1);
      process.exit(0);
    }
    i++;
    if (cur % 10 === 1) {
      queue.push([(cur - 1) / 10, count + 1]);
      continue;
    }
    if (cur % 2 === 0) {
      queue.push([cur / 2, count + 1]);
      continue;
    }
    break;
  }

  console.log(-1);
  process.exit(0);
});
