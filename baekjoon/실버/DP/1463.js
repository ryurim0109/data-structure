const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
/**
 * 1로 만들기
 *
 * DP : 점화식, 큰문제를 작은문제로 쪼갠다.
 */
rl.on('line', (line) => {
  const N = Number(line);

  const DP = Array(N + 1).fill(0);
  for (let i = 2; i <= N; i++) {
    const prevList = [DP[i - 1]];
    if (i % 3 === 0) {
      prevList.push(DP[i / 3]);
    }
    if (i % 2 === 0) {
      prevList.push(DP[i / 2]);
    }

    DP[i] = Math.min(...prevList) + 1;
  }

  console.log(DP[N]);
}).on('close', () => {
  process.exit();
});
