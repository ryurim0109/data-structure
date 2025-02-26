const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let A;
let B;
rl.on('line', (line) => {
  if (!A) {
    A = line.split('').map(String);
    return;
  }
  B = line.split('').map(String);
}).on('close', () => {
  const dp = Array.from({ length: A.length + 1 }, () =>
    Array(B.length + 1).fill(0)
  );

  for (let i = 1; i <= A.length; i++) {
    for (let j = 1; j <= B.length; j++) {
      if (A[i - 1] === B[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  console.log(dp[A.length][B.length]);
  process.exit();
});
