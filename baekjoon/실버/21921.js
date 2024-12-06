const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[N, X], [...list]] = input;
  const store = [];
  const ps = [0];
  for (let i = 0; i < list.length; i++) {
    ps.push(ps[i] + list[i]);
  }

  let max = 0;
  let count = 0;
  for (let i = X; i < ps.length; i++) {
    const sum = ps[i] - ps[i - X];
    if (max < sum) {
      max = sum;
      count = 1;
      continue;
    }
    if (max === sum) {
      count++;
      continue;
    }
  }
  if (max === 0) {
    console.log('SAD');
  } else {
    console.log(`${max}\n${count}`);
  }
  process.exit(0);
});
