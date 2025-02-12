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
    return a[0] < b[0];
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
      if (this.isSmall(parent, cur)) return;
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
      if (this.isSmall(cur, child)) return;
      this.list[curIdx] = child;
      this.list[childIdx] = cur;
      curIdx = childIdx;
    }
  }
}

rl.on('line', (line) => {
  const [N, K] = line.split(' ').map(Number);
  const d = Array.from({ length: 100001 }, () => Infinity);

  const heap = new MinHeap();
  heap.push([0, N]);
  d[N] = 0;

  while (heap.size) {
    const [time, pos] = heap.pop();
    if (d[pos] < time) continue;

    if (pos * 2 <= 100000) {
      if (time < d[pos * 2]) {
        d[pos * 2] = time;
        heap.push([time, pos * 2]);
      }
    }

    for (const next of [pos - 1, pos + 1]) {
      if (0 <= next && next <= 100000) {
        if (time + 1 < d[next]) {
          d[next] = time + 1;
          heap.push([time + 1, next]);
        }
      }
    }
  }
  console.log(d[K]);
}).on('close', () => {
  process.exit();
});
