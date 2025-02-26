const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let A, B;
rl.on('line', (line) => {
  if (!A) {
    A = line.split('');
    return;
  }
  B = line.split('');
}).on('close', () => {
  const dp = Array.from({ length: A.length + 1 }, () =>
    Array(B.length + 1).fill(0)
  );

  for (let x = 1; x <= A.length; x++) {
    for (let y = 1; y <= B.length; y++) {
      if (A[x - 1] === B[y - 1]) {
        dp[x][y] = dp[x - 1][y - 1] + 1;
      } else {
        dp[x][y] = Math.max(dp[x - 1][y], dp[x][y - 1]);
      }
    }
  }

  const result = [];

  let [x, y] = [A.length, B.length];
  while (dp[x][y]) {
    const cur = dp[x][y];
    const [prevX, prevY] = [dp[x - 1][y], dp[x][y - 1]];
    if (cur === prevX && cur === prevY) {
      x -= 1;
    } else if (cur === prevX) {
      x -= 1;
    } else if (cur === prevY) {
      y -= 1;
    } else {
      result.push(A[x - 1]);
      x -= 1;
      y -= 1;
    }
  }

  const answer = dp[A.length][B.length];
  console.log(answer);
  if (answer) {
    console.log(result.reverse().join(''));
  }

  process.exit();
});
