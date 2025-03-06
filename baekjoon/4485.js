const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
class MinHeap {
  list;
  constructor() {
    this.list = [null];
  }

  get size() {
    return this.list.length - 1;
  }
  isSmall(a, b) {
    return a < b;
  }
  getChildIdx(idx) {
    const leftIdx = idx * 2;
    const rightIdx = leftIdx + 1;
    const left = this.list[leftIdx];
    const right = this.list[rightIdx];
    if (!right) return leftIdx;
    if (left[0] < right[0]) return leftIdx;
    return rightIdx;
  }
  push(node) {
    this.list.push(node);
    this.heapUp();
  }
  pop() {
    if (!this.size) return -1;
    const node = this.list[1];
    this.list[1] = this.list[this.size];
    this.list[this.list.size] = node;
    this.list.pop();
    this.heapDown();
    return node;
  }

  heapUp() {
    let curIdx = this.size;

    while (1 < curIdx) {
      const parentIdx = Math.floor(curIdx / 2);
      const parent = this.list[parentIdx];
      const cur = this.list[curIdx];
      if (this.isSmall(parent[0], cur[0])) return;
      this.list[parentIdx] = cur;
      this.list[curIdx] = parent;
      curIdx = parentIdx;
    }
  }
  heapDown() {
    let curIdx = 1;
    while (curIdx * 2 <= this.size) {
      const childIdx = this.getChildIdx(curIdx);
      const child = this.list[childIdx];
      const cur = this.list[curIdx];
      if (this.isSmall(cur[0], child[0])) return;
      this.list[childIdx] = cur;
      this.list[curIdx] = child;
      curIdx = childIdx;
    }
  }
}
let N = -1;
let input = [];
const result = [];
let problemCount = 0;
const solution = () => {
  problemCount++;
  const D = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const dist = Array.from({ length: N }, () => Array(N).fill(Infinity));
  const heap = new MinHeap();
  heap.push([input[0][0], 0, 0]);
  dist[0][0] = input[0][0];
  while (heap.size) {
    const [coin, y, x] = heap.pop();
    if (dist[y][x] < coin) continue;

    if (y === N - 1 && x === N - 1) {
      result.push(`Problem ${problemCount}: ${coin}`);
      return;
    }
    for (let d = 0; d < 4; d++) {
      const [dy, dx] = D[d];
      const [ny, nx] = [dy + y, dx + x];

      if (ny < 0 || nx < 0 || N <= ny || N <= nx) continue;
      const nextCoin = coin + input[ny][nx];
      if (nextCoin < dist[ny][nx]) {
        dist[ny][nx] = nextCoin;
        heap.push([nextCoin, ny, nx]);
      }
    }
  }
};
rl.on('line', (line) => {
  if (Number(line) === 0) {
    console.log(result.join('\n'));
    process.exit();
  } else {
    if (N === -1) {
      N = Number(line);
      return;
    }
    input.push(line.split(' ').map((el) => Number(el)));
    if (input.length === N) {
      solution();
      N = -1;
      input = [];
      return;
    }
  }
}).on('close', () => {
  process.exit();
});
