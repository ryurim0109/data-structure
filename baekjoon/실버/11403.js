const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//경로 찾기
//플로이드 워셜 알고리즘 (그래프의 최소 경로)
const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const [[N], ...map] = input;

  for (let d = 0; d < N; d++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (map[i][d] && map[d][j]) {
          map[i][j] = 1;
        }
      }
    }
  }

  console.log(map.map((el) => el.join(' ')).join('\n'));

  process.exit();
});
