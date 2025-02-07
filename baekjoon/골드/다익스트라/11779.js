const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
class HeapNode {
  city;
  cost;
  list;
  constructor(node) {
    this.city = node.city;
    this.cost = node.cost;
    this.list = node.list;
  }
}
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
    if (left < right) return leftIdx;
    return rightIdx;
  }
  push(node) {
    const heapNode = new HeapNode(node);
    this.list.push(heapNode);
    this.heapUp;
  }
  pop() {
    if (!this.size) return 0;
    let node = this.list[1];
    this.list[1] = this.list[this.size];
    this.list[this.size] = node;
    this.list.pop();
    return node;
  }
  heapUp() {
    let curIdx = this.size;

    while (1 < curIdx) {
      const parentIdx = Math.floor(curIdx / 2);
      const parent = this.list[parentIdx];
      const cur = this.list[curIdx];
      if (this.isSmall(parent.cost, cur.cost)) return;
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
      if (this.isSmall(cur.cost, child.cost)) return;
      this.list[childIdx] = cur;
      this.list[curIdx] = child;
      curIdx = childIdx;
    }
  }
}

let N, M;
const input = [];
let target = [];
let result;
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
  } else {
    input.push(line.split(' ').map(Number));
  }
}).on('close', () => {
  const graph = Array.from({ length: N + 1 }, () => []);
  const d = Array.from({ length: N + 1 }, () => Infinity);

  input.forEach(([from, to, dist]) => graph[from].push([to, dist]));

  const heap = new MinHeap();
  heap.push({ cost: 0, city: target[0], list: [target[0]] });
  d[target[0]] = 0;

  while (heap.size) {
    const node = heap.pop();

    const { list, cost, city } = node;

    if (d[city] < cost) continue;

    for (const [next, dist] of graph[city]) {
      const nextCost = cost + dist;

      if (nextCost < d[next]) {
        d[next] = nextCost;
        const newList = [...list, next];
        heap.push({ cost: nextCost, city: next, list: [...newList] });
        if (next === target[1]) {
          result = [...newList];
        }
      }
    }
  }

  console.log(d[target[1]]);
  console.log(result.length);
  console.log(result.join(' '));

  process.exit(0);
});
