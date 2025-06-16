const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(Number(line));
}).on('close', () => {
  const [N, ...list] = input;
  let count = BigInt(0);

  let i = 0;

  const stack = [];

  const sumCache = Array(N).fill(null);
  sumCache[0] = 0;
  sumCache[1] = 1;

  const sum = (i) => {
    if (sumCache[i] !== null) {
      return sumCache[i];
    }
    sumCache[i] = sum(i - 1) + i;
    return sumCache[i];
  };
  while (i < N) {
    if (!stack.length) {
      stack.push([list[i], 1]);

      i++;
      continue;
    }

    const [curN, curW] = stack.pop();

    const nextN = list[i];

    if (curN == nextN) {
      if (stack.length) {
        count++;
      }
      stack.push([curN, curW + 1]);
      i++;
      continue;
    }

    if (curN < nextN) {
      count += BigInt(curW);
      count += BigInt(sum(curW - 1));
    } else {
      stack.push([curN, curW]);
      stack.push([nextN, 1]);
      count++;
      i++;
    }
  }

  while (stack.length) {
    const [a, curW] = stack.pop();
    count += BigInt(sum(curW - 1));
  }

  console.log(count.toString());
  process.exit();
});
