export type HeapNodeType = {
  score: number;
};

class HeapNode {
  node: HeapNodeType;
  isMax: boolean;
  constructor(node: HeapNodeType, isMax: boolean) {
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

export class Heap {
  private heap: [null, ...HeapNode[]];
  protected _size: number;
  protected isMax: boolean;

  constructor(isMax: boolean = true) {
    this.heap = [null];
    this._size = 0;
    this.isMax = isMax;
  }

  get size() {
    return this._size;
  }

  private heapUp() {
    //0번째 요소는  null이니까
    let idx = this.size;

    while (idx > 1) {
      const node = this.heap[idx]!;
      const fatherIdx = Math.floor(idx / 2);
      const father = this.heap[fatherIdx]!;

      if (node?.score < father?.score) return;
      this.heap[idx] = father;
      this.heap[fatherIdx] = node;
      idx = fatherIdx;
    }
  }

  private getBetterChildIdx(idx: number) {
    const leftIdx = idx * 2;
    const rightIdx = idx * 2 + 1;
    const left = this.heap[leftIdx]!;
    const right = this.heap[rightIdx];

    if (!right) return leftIdx;
    // score 더 큰 값이랑 비교 하기 위해
    return left?.score > right.score ? leftIdx : rightIdx;
  }

  private heapDown() {
    let idx = 1;
    // 자식이 있는지 검증
    while (idx * 2 <= this.size) {
      const node = this.heap[idx]!;
      // 큰 자식 가져오기
      const childIdx = this.getBetterChildIdx(idx);
      const childNode = this.heap[childIdx]!;
      if (node.score > childNode.score) return;
      this.heap[childIdx] = node;
      this.heap[idx] = childNode;

      idx = childIdx;
    }
  }

  insert(node: HeapNodeType) {
    const heapNode = new HeapNode(node, this.isMax);
    this.heap.push(heapNode);
    this._size++;
    this.heapUp();
  }

  takeout() {
    if (!this.size) return undefined;

    const head = this.heap[1]!;
    const node = this.heap.pop()!;
    this._size--;

    if (this.size === 0) return node;
    this.heap[1] = node;

    this.heapDown();

    return head.node;
  }
}

// const heap:HeapNode[] =[];
// const node = {name:'d',score:1}

// const insert=(node:HeapNode)=>{
// heap.push(node)
// }
// const heapUp =()=>{

// }
// const heapDown=()=>{}
// const takeout =()=>{
//   //root node 와 맨 뒤의 요소를 바꿔준다.
// return heap.pop()
// }
