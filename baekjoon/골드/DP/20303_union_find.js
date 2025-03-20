const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class UnionFind {
  list = [];
  constructor(input) {
    this.list = [null];
    const values = input.split(' ').map(Number);

    for (let i = 0; i < values.length; i++) {
      // [사탕, 그룹 친구 수(우는 아이수), parent index]
      this.list.push([values[i], 1, i + 1]);
    }
  }

  union(a, b) {
    const [candyA, babyA, A] = this.find(a);
    const [candyB, babyB, B] = this.find(b);
    if (A === B) return;
    if (A < B) {
      this.list[A] = [candyA + candyB, babyA + babyB, A];
      this.list[B] = [candyA + candyB, babyA + babyB, A];
    } else {
      this.list[A] = [candyA + candyB, babyA + babyB, B];
      this.list[B] = [candyA + candyB, babyA + babyB, B];
    }
  }
  find(idx) {
    if (this.list[idx][2] === idx) return this.list[idx];

    const parent = this.find(this.list[idx][2]);
    this.list[idx][2] = parent[2];
    return parent;
  }
}

let N, M, K;
let uf;
rl.on('line', (line) => {
  if (!N) {
    [N, M, K] = line.split(' ').map(Number);
    return;
  }
  if (!uf) {
    uf = new UnionFind(line);
    return;
  }
  uf.union(...line.split(' ').map(Number));
}).on('close', () => {
  const set = new Set();
  const list = [];
  for (let i = 1; i <= N; i++) {
    const [candy, baby, idx] = uf.find(i);
    if (set.has(idx)) continue;
    set.add(idx);
    list.push([candy, baby]);
  }

  const DP = new Array(K).fill(0);
  for (let i = 0; i < list.length; i++) {
    const [candy, baby] = list[i];
    for (let j = K - 1; j >= baby; j--) {
      DP[j] = Math.max(DP[j], DP[j - baby] + candy);
    }
  }
  console.log(DP[K - 1]);
  process.exit();
});
