const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Heap {
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
    let node = this.list[1];
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
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const dist = Array.from({ length: M }, () => Array(N).fill(Infinity));
  const heap = new Heap();
  heap.push([0, 0, 0]);
  dist[0][0] = 0;
  while (heap.size) {
    const [broken, y, x] = heap.pop();
    if (dist[y][x] < broken) continue;
    if (y === M - 1 && x === N - 1) {
      console.log(broken);
      process.exit();
    }

    for (let d = 0; d < 4; d++) {
      const [dy, dx] = D[d];
      const [ny, nx] = [dy + y, dx + x];

      if (ny < 0 || M <= ny || nx < 0 || N <= nx) continue;

      const nextBroken = broken + input[y][x];
      if (nextBroken < dist[ny][nx]) {
        dist[ny][nx] = nextBroken;
        heap.push([nextBroken, ny, nx]);
      }
    }
  }
  process.exit();
});
