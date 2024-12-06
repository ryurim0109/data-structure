const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const used = Array(10).fill(0);
  let count = 0;
  for (let i = 0; i < line.length; i++) {
    let cur = Number(line[i]);
    if (cur === 9) {
      cur = 6;
    }
    if (count <= used[cur]) {
      count++;
    }
    if (cur === 6) {
      used[cur] += 0.5;
    } else {
      used[cur]++;
    }
  }
  console.log(count);
}).on('close', () => {
  process.exit(0);
});
