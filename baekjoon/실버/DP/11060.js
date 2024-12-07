const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[N], list] = input;
  const DP = Array(N).fill(1000);

  if (N === 1) {
    console.log(0);
    process.exit(0);
  }

  const queue = [[0, 0]];
  DP[0] = 0;
  let i = 0;
  while (i < queue.length) {
    const [p, count] = queue[i];
    i++;
    const cur = list[p];
    for (let s = 1; s <= cur; s++) {
      const next = p + s;
      if (N <= next) break;
      if (DP[next] <= count + 1) continue;
      if (!list[next]) continue;
      if (N - 1 === next) {
        console.log(count + 1);
        process.exit(0);
      }
      DP[next] = count + 1;
      queue.push([next, DP[next]]);
    }
  }
  console.log(-1);
  process.exit(0);
});
