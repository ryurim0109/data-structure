const { throws } = require('assert');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class MaxHeap {
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
    if (left > right) return leftIdx;
    return rightIdx;
  }
  isAThanB(a, b) {
    return a > b;
  }

  push(value) {
    this.list.push(value);
    this.heapUp();
  }

  pop() {
    if (!this.size) return 0;
    const node = this.list[1];
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

      if (this.isAThanB(parent, cur)) return;
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

      if (this.isAThanB(cur, child)) return;
      this.list[childIdx] = cur;
      this.list[curIdx] = child;
      curIdx = childIdx;
    }
  }
}

const result = [];
let heap;

rl.on('line', (line) => {
  if (!heap) {
    heap = new MaxHeap();
    return;
  }
  if (Number(line) === 0) {
    result.push(heap.pop());
    return;
  }
  heap.push(Number(line));
}).on('close', () => {
  console.log(result.join('\n'));
  process.exit();
});
