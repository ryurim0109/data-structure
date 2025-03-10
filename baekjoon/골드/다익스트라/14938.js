const { timingSafeEqual } = require('crypto');
const readline = require('readline');
const { start } = require('repl');
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
    if (!this.size) return;
    const node = this.list[1];

    this.list[1] = this.list[this.size];
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
      this.list[parentIdx] = cur;
      this.list[curIdx] = parent;
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
      this.list[childIdx] = cur;
      this.list[curIdx] = child;
      curIdx = childIdx;
    }
  }
}
let n, m, r;
let items;
const input = [];
rl.on('line', (line) => {
  if (!n) {
    [n, m, r] = line.split(' ').map(Number);
    return;
  }
  if (!items) {
    items = line.split(' ').map(Number);
    return;
  }
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const graph = Array.from({ length: n + 1 }, () => []);
  input.forEach(([start, end, dist]) => {
    graph[start].push([end, dist]);
    graph[end].push([start, dist]);
  });
  let maxItems = 0;
  for (let start = 1; start <= n; start++) {
    const dp = Array(n + 1).fill(Infinity);
    const heap = new MinHeap();
    heap.push([0, start]);
    dp[start] = 0;

    while (heap.size) {
      const [d, cur] = heap.pop();
      if (dp[cur] < d) continue;

      for (const [next, dist] of graph[cur]) {
        const nextDist = d + dist;
        if (nextDist < dp[next]) {
          dp[next] = nextDist;
          heap.push([nextDist, next]);
        }
      }
    }
    let totalItems = 0;
    for (let i = 1; i <= n; i++) {
      if (dp[i] <= m) {
        totalItems += items[i - 1];
      }
    }
    maxItems = Math.max(maxItems, totalItems);
  }
  console.log(maxItems);
  process.exit();
});
