const { endianness } = require('os');
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
let N, E;
const input = [];
let target = [];
rl.on('line', (line) => {
  if (!N) {
    [N, E] = line.split(' ').map(Number);
    return;
  }
  if (input.length === E) {
    target = line.split(' ').map(Number);
  } else {
    input.push(line.split(' ').map(Number));
  }
}).on('close', () => {
  const graph = Array.from({ length: N + 1 }, () => []);

  input.forEach(([start, end, distance]) => {
    graph[start].push([end, distance]);
    graph[end].push([start, distance]);
  });

  const dijkstra = (start) => {
    const d = Array.from({ length: N + 1 }, () => Infinity);
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
    return d;
  };

  const [v1, v2] = target;
  const a = dijkstra(1)[v1] + dijkstra(v1)[v2] + dijkstra(v2)[N];

  const b = dijkstra(1)[v2] + dijkstra(v2)[v1] + dijkstra(v1)[N];

  const answer = Math.min(a, b);

  console.log(answer === Infinity ? -1 : answer);
  process.exit();
});
