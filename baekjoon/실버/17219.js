const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputMap = new Map();

const input = [];
const result = [];
rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);

  for (let i = 1; i <= N; i++) {
    const [site, pwd] = input[i].split(' ');
    inputMap.set(site, pwd);
  }
  for (let i = N + 1; i < N + M + 1; i++) {
    result.push(inputMap.get(input[i]));
  }
  console.log(result.join('\n'));
  process.exit();
});
