const readline = require('readline');
const { start } = require('repl');
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
let N, M, X;
const input = [];
rl.on('line', (line) => {
  if (!N) {
    [N, M, X] = line.split(' ').map(Number);
    return;
  }

  input.push(line.split(' ').map(Number));
}).on('close', () => {
  const graph = Array.from({ length: N + 1 }, () => []);
  const reversedGraph = Array.from({ length: N + 1 }, () => []);

  const d1 = Array.from({ length: N + 1 }, () => Infinity);
  const d2 = Array.from({ length: N + 1 }, () => Infinity);

  input.forEach(([start, end, time]) => graph[start].push([end, time]));
  input.forEach(([start, end, time]) => reversedGraph[end].push([start, time]));

  const heap1 = new Heap();
  const heap2 = new Heap();
  heap1.push([0, X]);
  heap2.push([0, X]);

  d1[X] = 0;
  d2[X] = 0;
  while (heap1.size) {
    const [t, cur] = heap1.pop();
    if (d1[cur] < t) continue;

    for (const [next, nextT] of graph[cur]) {
      const nextTime = t + nextT;

      if (nextTime < d1[next]) {
        d1[next] = nextTime;
        heap1.push([nextTime, next]);
      }
    }
  }

  while (heap2.size) {
    const [t, cur] = heap2.pop();
    if (d2[cur] < t) continue;

    for (const [next, nextT] of reversedGraph[cur]) {
      const nextTime = t + nextT;

      if (nextTime < d2[next]) {
        d2[next] = nextTime;
        heap2.push([nextTime, next]);
      }
    }
  }

  const result = [];
  for (let i = 1; i <= N; i++) {
    result.push(d1[i] + d2[i]);
  }
  console.log(Math.max(...result));
  process.exit();
});
