const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
// 뱀과 사다리 게임
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[N, M], ...ladderList] = input;
  const visit = Array(101).fill(0);

  const queue = [[1, 0]];
  let i = 0;
  visit[1] = 1;
  while (i < queue.length) {
    const [cur, count] = queue[i];
    i++;

    for (let d = 1; d <= 6; d++) {
      const next = cur + d;
      if (100 < next) continue;
      if (next === 100) {
        console.log(count + 1);
        process.exit(0);
      }
      if (visit[next]) continue;
      const ladder = ladderList.find((ladder) => ladder[0] === next);
      visit[next] = 1;
      if (ladder) {
        const [_, endPoint] = ladder;

        queue.push([endPoint, count + 1]);
        continue;
      }
      queue.push([next, count + 1]);
    }
  }
  process.exit();
});
