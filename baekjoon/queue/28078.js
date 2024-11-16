const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Queue {
  list;
  bSize;
  wSize;
  capacity;
  front;
  rear;
  degree;
  constructor(capacity) {
    this.capacity = capacity;
    this.list = [];
    this.front = 0;
    this.rear = 0;
    this.bSize = 0;
    this.wSize = 0;
    this.degree = 0;
  }
  push(type) {
    this.list[this.rear % this.capacity] = type;
    this.rear++;
    this[type + 'Size']++;
    this.out();
  }
  pop() {
    if (this.bSize + this.wSize === 0) return;
    const type = this.list[this.front % this.capacity];
    this.list[this.front % this.capacity] = null;
    this.front++;
    this[type + 'Size']--;
    this.out();
  }

  rotate(type) {
    if (type === 'l') {
      this.degree = (this.degree + 270) % 360;
    } else {
      this.degree = (this.degree + 90) % 360;
    }
    this.out();
  }

  out() {
    if (this.degree % 180 === 0) return;
    //rear 바닥
    if (this.degree === 270) {
      let cur = this.list[(this.rear - 1) % this.capacity];
      while (cur === 'b' && this.bSize > 0) {
        this.list[(this.rear - 1) % this.capacity] = null;
        this.rear--;
        this.bSize--;
        cur = this.list[(this.rear - 1) % this.capacity];
      }
    } else {
      //front 바닥
      let cur = this.list[this.front % this.capacity];
      while (cur === 'b' && this.bSize > 0) {
        this.list[this.front % this.capacity] = null;
        this.front++;
        this.bSize--;
        cur = this.list[this.front % this.capacity];
      }
    }
  }
  count(type) {
    return this[type + 'Size'];
  }
}

let queue;
const result = [];

rl.on('line', (line) => {
  if (!queue) {
    queue = new Queue(Number(line));
    return;
  }

  const [cmd, type] = line.split(' ');
  const value = queue[cmd](type);

  if (cmd === 'count') {
    result.push(value);
  }
}).on('close', () => {
  console.log(result.join('\n'));
  process.exit();
});
