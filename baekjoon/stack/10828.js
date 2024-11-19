const readline = require("readline")

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});


class Stack{
  head
  tail
  capacity
  list

  constructor(capacity){
    this.head = 0;
    this.tail = 0;
    this.list = [];
    this.capacity = capacity;
  }

  // push X: 정수 X를 스택에 넣는 연산이다.
  push(x){
    this.list[this.tail % this.capacity] = x;
    this.tail ++;
  }
// pop: 스택에서 가장 위에 있는 정수를 빼고, 그 수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.
pop(){
  if(!this.size()) return -1;
  this.tail --;
  const node = this.list[this.tail % this.capacity];

  return node;
  
}
// size: 스택에 들어있는 정수의 개수를 출력한다.
size(){
  return this.tail - this.head;
}
// empty: 스택이 비어있으면 1, 아니면 0을 출력한다.
empty(){
  if(!this.size()) return 1
  return 0
}
// top: 스택의 가장 위에 있는 정수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.
top(){
  if(!this.size()) return -1

  return this.list[(this.tail - 1)% this.capacity];
}
}

let stack
const result = [];

rl.on('line',(line)=>{

  if(!stack){
     stack = new Stack(Number(line));
     return

  }
  const [cmd,x] = line.split(" ");
  const res = stack[cmd](x);
  if(cmd ==='push') return;
  result.push(res);




}).on('close',()=>{
  console.log(result.join('\n'))
  process.exit(0);

})