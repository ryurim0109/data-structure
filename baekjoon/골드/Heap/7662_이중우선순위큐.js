const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class HeapNode {
  constructor(value) {
    this.value = value;
  }
}
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
  push(node) {
    this.list.push(node);
    this.heapUp();
  }
  pop() {
    if (!this.size) return null;

    let node = this.list[1];
    this.list[1] = this.list[this.size];
    this.list[this.size] = node;
    const popNode = this.list.pop();
    this.heapDown();
    if (popNode.isPop) {
      node = this.pop();
    }

    return node;
  }
  getChildIdx(idx) {
    const leftIdx = idx * 2;
    const rightIdx = leftIdx + 1;
    const left = this.list[leftIdx];
    const right = this.list[rightIdx];
    if (!right) return leftIdx;
    if (this.type === 'min') {
      if (left.value <= right.value) return leftIdx;
    } else {
      if (right.value <= left.value) return leftIdx;
    }
    return rightIdx;
  }
  isAThanB(a, b) {
    return this.type === 'min' ? a.value <= b.value : a.value >= b.value;
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

// class Heap {
//   min;
//   max;
//   valueMap;
//   constructor() {
//     this.min = new ComplexHeap('min');
//     this.max = new ComplexHeap('max');
//     this.valueMap = new Map();
//   }
//   push(value) {
//     this.max.push(value);
//     this.min.push(value);
//     this.valueMap.set(value, (this.valueMap.get(value) || 0) + 1);
//   }

//   pop(type) {
//     const heap = type === 'max' ? this.max : this.min;
//     while (heap.size > 0) {
//       const node = heap.pop();
//       const count = this.valueMap.get(node);
//       if (count && count > 0) {
//         this.valueMap.set(node, count - 1);
//         return node;
//       }
//     }
//     return undefined;
//   }

//   get size() {
//     let total = 0;
//     for (const count of this.valueMap.values()) {
//       total += count;
//     }
//     return total;
//   }
//   getResult() {
//     if (this.size === 0) return 'EMPTY';

//     let max = undefined;
//     let min = undefined;

//     // max 찾기
//     let tempHeap = this.max;
//     while (tempHeap.size > 0) {
//       const node = tempHeap.pop();
//       if (this.valueMap.get(node) > 0) {
//         max = node;
//         break;
//       }
//     }

//     // min 찾기
//     tempHeap = this.min;
//     while (tempHeap.size > 0) {
//       const node = tempHeap.pop();
//       if (this.valueMap.get(node) > 0) {
//         min = node;
//         break;
//       }
//     }

//     if (max === undefined || min === undefined) {
//       max = max === undefined ? min : max;
//       min = min === undefined ? max : min;
//     }

//     return max !== undefined ? `${max} ${min}` : 'EMPTY';
//   }
// }

let T;
let N;
let minHeap;
let maxHeap;
let totalSize = 0;
let lastType = 'min';
const result = [];

rl.on('line', (line) => {
  if (!T) {
    T = Number(line);
    return;
  }
  if (!N) {
    N = Number(line);
    minHeap = new ComplexHeap('min');
    maxHeap = new ComplexHeap('max');
    totalSize = 0;
    return;
  }

  N--;
  let [type, num] = line.split(' ');
  num = Number(num);
  switch (type) {
    case 'I':
      const node = new HeapNode(num);
      minHeap.push(node);
      maxHeap.push(node);
      totalSize++;
      break;
    case 'D':
      if (totalSize === 0) break;

      if (num === 1) {
        const node = maxHeap.pop();
        node.isPop = true;
        lastType = 'max';
      } else {
        const node = minHeap.pop();
        node.isPop = true;
        lastType = 'min';
      }
      totalSize--;
      if (totalSize === 0) {
        minHeap = new ComplexHeap('min');
        maxHeap = new ComplexHeap('max');
      }
      break;
  }

  if (!N) {
    if (totalSize === 0) {
      result.push('EMPTY');
    } else {
      let [min, max] = [0, 0];
      if (totalSize === 1) {
        switch (lastType) {
          case 'min':
            max = minHeap.pop().value;
            min = max;
            break;
          case 'max':
            max = maxHeap.pop().value;
            min = max;
            break;
        }
        result.push(`${max} ${min}`);
      } else {
        const [max, min] = [maxHeap.pop().value, minHeap.pop().value];
        result.push(`${max} ${min}`);
      }
    }
  }
}).on('close', () => {
  console.log(result.join('\n'));
  process.exit();
});
