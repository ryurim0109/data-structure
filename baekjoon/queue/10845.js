const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input =[];
class Queue{
  list
  head
  tail
  capacity
  constructor(capacity){
    this.list = [];
    this.head = 0;
    this.tail = 0;
    this.capacity=capacity

  }
  push(x){
    this.list[this.tail % this.capacity] = x;
    this.tail++;
  }
  pop(){
    if(!this.size()) return -1;
    const node = this.list[this.head % this.capacity];
    this.head++;
    return node;

  }
  size(){
    return this.tail - this.head;
  }
  empty(){
    if(!this.size()) return 1
    return 0
  }
  front(){
    if(!this.size()) return -1;
    return this.list[this.head % this.capacity];
  }
  back(){
    if(!this.size()) return -1;
    return this.list[(this.tail - 1)% this.capacity];
  }
}
const result = [];
let queue 
rl.on('line',(line)=>{
  if(!queue){
    queue = new Queue(Number(line));
    return
  }
  const [command,x] = line.split(" ");
  const value = queue[command](x);
  if(command === "push") return;
  result.push(value);

}).on('close',()=>{
  
  console.log(result.join('\n'))
  process.exit()
})