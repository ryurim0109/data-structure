const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class HeapNode {
  node;
  isMax;
  constructor(node, isMax) {
    this.node = node;
    this.isMax = isMax;
  }

  get score() {
    if (this.isMax) {
      return this.node.score;
    }
    return -this.node.score;
  }
}

class Heap {
  heap;
  _size;

  constructor() {
    this.heap = [null];
    this._size = 0;
    this.isMax = true;
  }

  get size() {
    return this._size;
  }

  heapUp() {
    //0번째 요소는  null이니까
    let idx = this.size;

    while (idx > 1) {
      const node = this.heap[idx];
      const fatherIdx = Math.floor(idx / 2);
      const father = this.heap[fatherIdx];

      if (node?.score < father?.score) return;
      this.heap[idx] = father;
      this.heap[fatherIdx] = node;
      idx = fatherIdx;
    }
  }

  getBetterChildIdx(idx) {
    const leftIdx = idx * 2;
    const rightIdx = idx * 2 + 1;
    const left = this.heap[leftIdx];
    const right = this.heap[rightIdx];

    if (!right) return leftIdx;
    // score 더 큰 값이랑 비교 하기 위해
    return left?.score > right.score ? leftIdx : rightIdx;
  }

  heapDown() {
    let idx = 1;
    // 자식이 있는지 검증
    while (idx * 2 <= this.size) {
      const node = this.heap[idx];
      // 큰 자식 가져오기
      const childIdx = this.getBetterChildIdx(idx);
      const childNode = this.heap[childIdx];
      if (node.score > childNode.score) return;
      this.heap[childIdx] = node;
      this.heap[idx] = childNode;

      idx = childIdx;
    }
  }

  insert(node) {
    const heapNode = new HeapNode(node, this.isMax);
    this.heap.push(heapNode);
    this._size++;
    this.heapUp();
  }

  takeout() {
    if (!this.size) return undefined;

    const head = this.heap[1];
    const node = this.heap.pop();
    this._size--;

    if (this.size === 0) return node;
    this.heap[1] = node;

    this.heapDown();

    return head.node;
  }
}

let N, K;

let i = 0;
const bags = [];
const jewels = [];

rl.on('line', (line) => {
  if (!N) {
    [N, K] = line.split(' ').map(Number);

    return;
  }
  if (i === N) {
    bags.push(Number(line));
    return;
  }
  i++;

  const [weight, jewel] = line.split(' ').map(Number);
  jewels.push([jewel, weight]);
}).on('close', () => {
  const heap = new Heap();
  bags.sort((a, b) => a - b);
  jewels.sort((a, b) => a[1] - b[1]);

  let jIdx = 0;
  let result = 0;
  for (let j = 0; j < K; j++) {
    while (jIdx < N && jewels[jIdx][1] <= bags[j]) {
      heap.insert({ score: jewels[jIdx][0] });
      jIdx++;
    }

    if (heap.size) {
      const { score } = heap.takeout();
      result += score;
    }
  }
  console.log(result);
  process.exit();
});
