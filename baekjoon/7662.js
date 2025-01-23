const readline = require('readline');
const { runInThisContext } = require('vm');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class ComplexHeap {
  list;
  type;

  constructor(type) {
    this.list = [null];
    this.type = type;
  }
  get size() {
    return this.list.length - 1;
  }
  push(value) {
    this.list.push(value);
    this.heapUp();
  }
  pop() {
    if (!this.size) return null;

    const node = this.list[1];
    this.list[1] = this.list[this.size];
    this.list[this.size] = node;
    this.list.pop();
    this.heapDown();

    return node;
  }
  getChildIdx(idx) {
    const leftIdx = idx * 2;
    const rightIdx = leftIdx + 1;
    const left = this.list[leftIdx];
    const right = this.list[rightIdx];
    if (!right) return leftIdx;
    if (this.type === 'min') {
      if (left < right) return leftIdx;
    } else {
      if (right < left) return leftIdx;
    }
    return rightIdx;
  }
  isAThanB(a, b) {
    return this.type === 'min' ? a < b : a > b;
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

class Heap {
  min;
  max;
  constructor() {
    this.min = new ComplexHeap('min');
    this.max = new ComplexHeap('max');
  }
  push(value) {
    value > 0 ? this.max.push(value) : this.min.push(value);
  }

  pop(type) {
    return type === 'max' ? this.max.pop() : this.min.pop();
  }

  empty() {
    return this.min.size === 0 && this.max.size === 0;
  }
}
let heap;
let T;
let N;
const result = [];
rl.on('line', (line) => {
  if (!T) {
    T = Number(line);
  } else if (!N) {
    N = Number(line);
    heap = new Heap();
  } else {
    N--;

    const [type, num] = line.split(' ');

    const _type = Number(num) === 1 ? 'max' : 'min';
    if (type === 'I') {
      heap.push(Number(num));
    } else {
      heap.pop(_type);
    }
    if (N === 0) {
      if (heap.empty()) {
        result.push('EMPTY');
      } else {
        const max = heap.pop('max');
        const min = heap.pop('min');
        result.push(max !== null && min !== null ? `${max} ${min}` : 'EMPTY');
      }
      N = null;
    }
  }
}).on('close', () => {
  console.log(result.join('\n'));
  process.exit();
});
