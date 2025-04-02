const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class HeapNode {
  constructor(node) {
    this.origin = node;
    this.value = node[1];
  }
}
class Heap {
  list;
  size;
  constructor() {
    this.list = [null];
    this.size = 0;
  }
  aThanB(a, b) {
    return a.value < b.value;
  }
  up() {
    let idx = this.size;
    while (idx > 1) {
      const node = this.list[idx];
      const fatherIdx = Math.floor(idx / 2);
      const father = this.list[fatherIdx];
      if (this.aThanB(father, node)) return;
      this.list[idx] = father;
      this.list[fatherIdx] = node;
      idx = fatherIdx;
    }
  }
  push(node) {
    this.list.push(new HeapNode(node));
    this.size++;
    this.up();
  }
  getBetterChildIdx(idx) {
    const leftIdx = idx * 2;
    const rightIdx = idx * 2 + 1;
    const left = this.list[leftIdx];
    const right = this.list[rightIdx];
    if (!right) return leftIdx;
    return this.aThanB(left, right) ? leftIdx : rightIdx;
  }
  down() {
    let idx = 1;
    while (idx * 2 <= this.size) {
      const node = this.list[idx];
      const childIdx = this.getBetterChildIdx(idx);
      const childNode = this.list[childIdx];
      if (node > childNode) return;
      this.list[childIdx] = node;
      this.list[idx] = childNode;
      idx = childIdx;
    }
  }
  pop() {
    if (this.size === 0) return undefined;
    const head = this.list[1];
    const node = this.list.pop();
    this.size--;
    if (this.size === 0) return node.origin;
    this.list[1] = node;
    this.down();
    return head.origin;
  }
}
let V, E, M, x, S, y;
let graph;
let mList, sList;
rl.on('line', (line) => {
  if (!V) {
    [V, E] = line.split(' ').map(Number);
    graph = Array.from({ length: V + 1 }, () => []);
    return;
  }
  if (E) {
    const [u, v, w] = line.split(' ').map(Number);
    graph[u].push([v, w]);
    graph[v].push([u, w]);
    E--;
    return;
  }
  if (!M) {
    [M, x] = line.split(' ').map(Number);
    return;
  }
  if (!mList) {
    mList = line.split(' ').map(Number);
    return;
  }
  if (!S) {
    [S, y] = line.split(' ').map(Number);
    return;
  }
  if (!sList) {
    sList = line.split(' ').map(Number);
    return;
  }
}).on('close', () => {
  graph.push(sList.map((el) => [el, 0]));
  graph.push(mList.map((el) => [el, 0]));

  const dpS = Array(V + 3).fill(Infinity);
  const dpM = Array(V + 3).fill(Infinity);

  const dijkstra = (start, limit, dp) => {
    const heap = new Heap();
    dp[start] = 0;
    heap.push([start, 0]);
    while (heap.size) {
      const [cur, weight] = heap.pop();
      for (let i = 0; i < graph[cur].length; i++) {
        const [next, nextWeight] = graph[cur][i];

        const newWeight = weight + nextWeight;
        if (limit < newWeight) continue;
        if (newWeight < dp[next]) {
          dp[next] = newWeight;
          heap.push([next, newWeight]);
        }
      }
    }
  };
  dijkstra(V + 1, y, dpS);
  dijkstra(V + 2, x, dpM);

  let min = Infinity;
  const noSet = new Set([...sList, ...mList]);
  for (let i = 1; i < dpS.length; i++) {
    if (noSet.has(i)) continue;
    const sum = dpS[i] + dpM[i];
    if (sum < min) {
      min = sum;
    }
  }
  console.log(min === Infinity ? -1 : min);
  process.exit(0);
});
