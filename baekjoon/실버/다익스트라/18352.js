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
    let node = this.list[1];
    this.list[1] = this.list[this.size];
    this.list[this.size] = this.list[1];
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
let N, M, K, X;

const input = [];
rl.on('line', (line) => {
  if (!N) {
    [N, M, K, X] = line.split(' ').map(Number);
    return;
  }

  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const graph = Array.from({ length: N + 1 }, () => []);
  const d = Array.from({ length: N + 1 }, () => Infinity);

  input.forEach(([start, end]) => graph[start].push([end, 1]));

  const heap = new Heap();
  heap.push([0, X]);
  d[X] = 0;

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
  const result = [];
  for (let i = 1; i <= N; i++) {
    if (d[i] === K) {
      result.push(i);
    }
  }
  if (result.length === 0) {
    console.log(-1);
  } else {
    console.log(result.join('\n'));
  }
  process.exit();
});
