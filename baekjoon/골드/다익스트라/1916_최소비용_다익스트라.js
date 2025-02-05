const readline = require('readline');
const { runInThisContext } = require('vm');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
const input = [];
let target = [];

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

    let node = this.list[1];
    this.list[1] = this.list[this.size];
    this.list[this.size] = node;
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
      if (this.isSmall(parent, cur)) return;
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
      if (this.isSmall(cur, child)) return;
      this.list[childIdx] = cur;
      this.list[curIdx] = child;
      curIdx = childIdx;
    }
  }
}
rl.on('line', (line) => {
  if (!N) {
    N = Number(line);
    return;
  }
  if (!M) {
    M = Number(line);
    return;
  }
  if (input.length === M) {
    target = line.split(' ').map(Number);
    rl.close();
  } else {
    input.push(line.split(' ').map(Number));
  }
}).on('close', () => {
  const graph = Array.from({ length: N + 1 }, () => []);
  const d = Array.from({ length: N + 1 }, () => Infinity);

  input.forEach(([from, to, dist]) => graph[from].push([to, dist]));

  const heap = new MinHeap();
  heap.push([0, target[0]]);
  d[target[0]] = 0;

  while (heap.size) {
    const [dist, cur] = heap.pop();

    if (d[cur] < dist) continue;

    for (const [next, cost] of graph[cur]) {
      const nextCost = dist + cost;

      if (nextCost < d[next]) {
        d[next] = nextCost;
        heap.push([nextCost, next]);
      }
    }
  }

  console.log(d[target[1]]);

  process.exit();
});
