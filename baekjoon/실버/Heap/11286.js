const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class HeapNode {
  origin;
  abs;
  constructor(value) {
    this.origin = value;
    this.abs = Math.abs(value);
  }
}

class Heap {
  list;
  constructor() {
    this.list = [null];
  }
  get size() {
    return this.list.length - 1;
  }

  AThanB(a, b) {
    if (a.abs === b.abs) {
      return a.origin < b.origin;
    }
    return a.abs < b.abs;
  }

  getChildIdx(idx) {
    const leftIdx = idx * 2;
    const rightIdx = leftIdx + 1;
    const left = this.list[leftIdx];
    const right = this.list[rightIdx];
    if (!right) return leftIdx;
    if (left.abs === right.abs) {
      return left.origin < right.origin ? leftIdx : rightIdx;
    }

    return left.abs < right.abs ? leftIdx : rightIdx;
  }
  push(value) {
    this.list.push(new HeapNode(value));
    this.heapUp();
  }
  pop() {
    if (!this.size) return 0;
    const node = this.list[1];
    this.list[1] = this.list[this.size];
    this.list[this.size] = node;
    this.list.pop();
    this.heapDown();
    return node.origin;
  }
  //min heap
  heapUp() {
    let curIdx = this.size;
    while (1 < curIdx) {
      const parentIdx = Math.floor(curIdx / 2);
      const cur = this.list[curIdx];
      const parent = this.list[parentIdx];
      if (this.AThanB(parent, cur)) return;
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
      if (this.AThanB(cur, child)) return;
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
    heap = new Heap();
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
