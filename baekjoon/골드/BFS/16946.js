const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//벽부수고 이동4
let N, M;
const input = [];
rl.on('line', (line) => {
  if (!N) {
    [N, M] = line.split(' ').map(Number);
    return;
  }
  input.push(line.split('').map(Number));
}).on('close', () => {
  const D = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];
  const answer = Array.from({ length: N }, () => Array(M).fill(0));
  const groupDP = Array.from({ length: N }, () => Array(M).fill(null));
  let groupList = [];
  let groupId = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (!input[y][x] && groupDP[y][x] === null) {
        const queue = [[y, x]];
        groupDP[y][x] = groupId;
        let size = 1;
        let i = 0;
        while (i < queue.length) {
          const [cy, cx] = queue[i];
          i++;
          for (let d = 0; d < 4; d++) {
            const [dy, dx] = D[d];
            const [ny, nx] = [dy + cy, dx + cx];

            if (ny < 0 || N <= ny || nx < 0 || M <= nx) continue;
            if (groupDP[ny][nx] !== null) continue;
            if (input[ny][nx] === 1) continue;
            groupDP[ny][nx] = groupId;
            queue.push([ny, nx]);
            size++;
          }
        }
        groupList[groupId] = size;
        groupId++;
      }
    }
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (input[y][x]) {
        let count = 1;
        const groupSet = new Set();

        for (let d = 0; d < 4; d++) {
          const [dy, dx] = D[d];
          const [ny, nx] = [dy + y, dx + x];
          if (ny < 0 || N <= ny || nx < 0 || M <= nx) continue;
          if (input[ny][nx] !== 0) continue;
          const group = groupDP[ny][nx];
          if (!groupSet.has(group)) {
            groupSet.add(group);
            count += groupList[group];
          }
        }

        answer[y][x] = count % 10;
      }
    }
  }
  console.log(answer.map((row) => row.join('')).join('\n'));
  process.exit();
});
