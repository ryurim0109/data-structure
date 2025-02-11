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
let V, E;
let start;
const input = [];
const result = [];
rl.on('line', (line) => {
  if (!V) {
    [V, E] = line.split(' ').map(Number);
    return;
  }
  if (!start) {
    start = Number(line);
    return;
  }
  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const graph = Array.from({ length: V + 1 }, () => []);
  const d = Array.from({ length: V + 1 }, () => Infinity);

  input.forEach(([start, end, distance]) => graph[start].push([end, distance]));

  const heap = new Heap();
  heap.push([0, start]);
  d[start] = 0;

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

  for (let i = 1; i <= V; i++) {
    result.push(d[i] === Infinity ? 'INF' : d[i]);
  }
  console.log(result.join('\n'));
  process.exit();
});
