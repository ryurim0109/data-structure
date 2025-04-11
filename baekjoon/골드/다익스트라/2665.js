const { throws } = require('assert');
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
  getChildIdx(idx) {
    const leftIdx = idx * 2;
    const rightIdx = leftIdx + 1;
    const left = this.list[leftIdx];
    const right = this.list[rightIdx];
    if (!right) return leftIdx;
    if (left[0] < right[0]) return leftIdx;
    return rightIdx;
  }
  isSmall(a, b) {
    return a < b;
  }
  push(node) {
    this.list.push(node);
    this.heapUp();
  }
  pop() {
    if (!this.size) return 0;
    const node = this.list[1];
    this.list[1] = this.list[this.size];
    this.list[this.size] = node;
    this.list.pop();
    this.heapDown();
    return node;
  }

  heapUp() {
    let curIdx = this.size;
    while (1 < curIdx) {
      const cur = this.list[curIdx];
      const parentIdx = Math.floor(curIdx / 2);
      const parent = this.list[parentIdx];
      if (this.isSmall(parent[0], cur[0])) return;
      this.list[curIdx] = parent;
      this.list[parentIdx] = cur;
      curIdx = parentIdx;
    }
  }
  heapDown() {
    let curIdx = 1;
    while (curIdx * 2 <= this.size) {
      const cur = this.list[curIdx];
      const childIdx = this.getChildIdx(curIdx);
      const child = this.list[childIdx];
      if (this.isSmall(cur[0], child[0])) return;
      this.list[curIdx] = child;
      this.list[childIdx] = cur;
      curIdx = childIdx;
    }
  }
}
let N;
const input = [];
rl.on('line', (line) => {
  if (!N) {
    N = Number(line);
    return;
  }

  input.push(line.split('').map(Number));
}).on('close', () => {
  const D = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const dist = Array.from({ length: N }, () => Array(N).fill(Infinity));

  const heap = new MinHeap();
  heap.push([0, 0, 0]);
  dist[0][0] = 0;

  while (heap.size) {
    const [count, y, x] = heap.pop();
    if (dist[y][x] < count) continue;

    if (y === N - 1 && x === N - 1) {
      console.log(dist[N - 1][N - 1]);
      process.exit();
    }

    for (let d = 0; d < 4; d++) {
      const [dy, dx] = D[d];
      const [ny, nx] = [dy + y, dx + x];

      if (ny < 0 || N <= ny || nx < 0 || N <= nx) continue;

      const tile = input[ny][nx];
      const isBlack = tile === 0;
      const nextCount = count + (isBlack ? 1 : 0);
      if (nextCount < dist[ny][nx]) {
        dist[ny][nx] = nextCount;
        heap.push([nextCount, ny, nx]);
      }
    }
  }

  process.exit();
});
