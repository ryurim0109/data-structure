// export class CirculerQueue<T> {
//   list: T | null[];
//   size: number;
//   head: number;
//   tail: number;

//   constructor(size: number = 4) {
//     this.list = [];
//     this.size = size;
//     this.head = 0;
//     this.tail = 0;
//   }

//   get isEmpty() {
//     return this.head === this.tail;
//   }

//   get length() {
//     return this.tail - this.head;
//   }

//   resize() {
//     const newList: T | null[] = [];
//     while (!this.isEmpty) {
//       newList.push(this.dequeue());
//     }

//     this.head = 0;
//     this.tail = this.size;
//     this.size *= 2;
//     this.list = newList;
//   }

//   dequeue() {
//     if (this.isEmpty) return undefined;
//     const node = this.list[this.head % this.size];
//     this.list[this.head % this.size] = null;
//     this.head++;
//     return node;
//   }

//   enqueue(data: T) {
//     this.list[this.tail % this.size] = data;
//     this.tail++;
//     if (this.length === this.size) {
//       this.resize();
//     }
//   }
// }


export class Queue<T>{
  list:T|null[];
  head:number;
  tail:number;
  size:number;

  constructor(size:number=4){
    this.size = size;
    this.head = 0;
    this.tail=0 ;
    this.list = [];
  }

  get length(){
    return this.tail - this.head;
  }

  get isEmpty(){
    return this.head === this.tail;
  }

  resize(){
    const newList: T|null[]=[];
    while(this.length){
      newList.push(this.dequeue());
    }
  
    this.head = 0;
    this.tail = this.size;
    this.size *= 2;
    this.list = newList;


  }

  // tail 에 값 추가 후 사이즈와 현재 리스트의 개수가 같다면, 리사이즈!
  enqueue(data:T){
    this.list[this.tail % this.size] = data;
    this.tail ++;
    if(this.size === this.length){
      this.resize();
    }
  }

  dequeue(){
    if(this.isEmpty) return undefined;

    const node = this.list[this.head % this.size];
    this.list[this.head % this.size ] = null;

    this.head ++;
    return node;
  }
}