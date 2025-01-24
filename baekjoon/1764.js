const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const map = new Map();
let N, M;
const result = [];
let count = 0;
rl.on('line', (line) => {
  if (!N) {
    [N, M] = line.split(' ').map(Number);
    return;
  }
  map.set(String(line), (map.get(String(line)) || 0) + 1);
}).on('close', () => {
  for (let [key, value] of map.entries()) {
    if (value === 2) {
      result.push(String(key));
      count++;
    }
  }
  console.log(count);
  console.log(result.sort().join('\n'));

  process.exit();
});
