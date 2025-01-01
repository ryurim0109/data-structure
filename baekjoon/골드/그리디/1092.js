const { escape } = require('querystring');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 배
const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[N], [...powers], [M], [...weights]] = input;

  let size = 0;
  let time = 0;
  const list = [];
  powers.sort((a, b) => a - b);
  weights.sort((a, b) => b - a);
  for (let i = 0; i < N; i++) {
    const curPower = powers[i];

    list.push({ power: curPower, boxList: [] });
    while (weights[weights.length - 1] <= curPower) {
      list[i].boxList.push(weights.pop());
      size++;
    }
  }

  if (size !== M) {
    console.log(-1);
    process.exit(0);
  }

  const find = (idx) => {
    for (let i = idx; 0 <= i; i--) {
      if (list[i].boxList.length) {
        list[i].boxList.pop();
        size--;
        break;
      }
    }
  };

  while (0 < size) {
    time++;
    for (let i = 0; i < N; i++) {
      if (list[i].boxList.length) {
        list[i].boxList.pop();
        size--;
        if (!size) break;
      } else {
        find(i - 1);
      }
    }
  }

  console.log(time);
  process.exit();
});
