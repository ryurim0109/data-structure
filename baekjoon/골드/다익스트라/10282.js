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

function dijkstra(graph, start, n) {
  const distance = Array(n + 1).fill(Infinity);
  distance[start] = 0; // 시작 컴퓨터는 즉시 감염

  const heap = new Heap();
  heap.push([0, start]);

  while (heap.size) {
    const current = heap.pop();
    if (!current) break;

    const [currentTime, currentNode] = current;

    if (currentTime > distance[currentNode]) continue;

    for (const { to, time } of graph[currentNode]) {
      const newTime = currentTime + time;

      if (newTime < distance[to]) {
        distance[to] = newTime;
        heap.push([newTime, to]);
      }
    }
  }

  return distance;
}

let testCase = 0;
let currentCase = 0;
let lineCount = 0;
let n = 0,
  d = 0,
  c = 0;
let graph = [];
let dCount = 0;
let results = [];
rl.on('line', (line) => {
  if (testCase === 0) {
    testCase = Number(line);
    return;
  }
  if (lineCount === 0) {
    [n, d, c] = line.split(' ').map(Number);
    graph = Array.from({ length: n + 1 }, () => []);
    lineCount++;
    dCount = 0;
    return;
  }
  const [a, b, s] = line.split(' ').map(Number);
  graph[b].push({ to: a, time: s });
  dCount++;
  if (dCount === d) {
    const dijkstraTime = dijkstra(graph, c, n);

    let count = 0;
    let time = 0;

    for (let i = 1; i <= n; i++) {
      if (dijkstraTime[i] !== Infinity) {
        count++;
        time = Math.max(time, dijkstraTime[i]);
      }
    }

    results.push(`${count} ${time}`);

    currentCase++;
    lineCount = 0;

    if (currentCase === testCase) {
      console.log(results.join('\n'));
      rl.close();
    }
  }
}).on('close', () => {
  process.exit();
});
