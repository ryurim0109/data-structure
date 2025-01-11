const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Queue {
  list;
  head;
  tail;
  capacity;

  constructor(capacity) {
    this.list = [];
    this.head = 0;
    this.tail = 0;
    this.capacity = capacity;
  }

  push(n) {
    this.list[this.tail % this.capacity] = n;
    this.tail++;
  }
  pop() {
    if (!this.size()) return;
    const node = this.list[this.head % this.capacity];
    this.head++;
    return node;
  }

  size() {
    return this.tail - this.head;
  }
}

let queue;
rl.on('line', (line) => {
  if (!queue) {
    queue = new Queue(Number(line));
  }
  for (let i = 1; i <= Number(line); i++) {
    queue.push(i);
  }
}).on('close', () => {
  let type = 'pop';
  while (queue.size() > 1) {
    if (type === 'pop') {
      queue.pop();
      type = 'push';
    } else {
      const node = queue.pop();
      queue.push(node);
      type = 'pop';
    }
  }
  console.log(queue.pop());
  process.exit();
});
