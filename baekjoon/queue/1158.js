// 요세푸스 문제

const readline = require('readline');
const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let N,K;

class Queue {
  list
  capacity
  size
  front
  rear
  constructor(capacity){
    this.capacity = capacity
    this.list = []
    this.size = 0;
    this.front = 0;
    this.rear = 0;

  }

  push(value){
    this.list[this.rear % this.capacity] = value;
    this.rear++;
    this.size++;

  }
  pop(){
  if(!this.size) undefined
  const node = this.list[this.front % this.capacity] 
   this.list[this.front % this.capacity] =null;
   this.size--;
   this.front++;
   return node;
  }

}
const result =[]
rl.on('line',(line)=>{
   [N,K] = line.split(' ').map(Number);




}).on('close',()=>{
     const queue =new Queue(N);
   for(let i=1; i<=N; i++){
    queue.push(i);
   }
   let i = 1;
   while(queue.size){
    const cur = queue.pop();
    if(i === K) {
      i = 0;
      result.push(cur)
    }else{
      queue.push(cur)
    }
    i++;
   }
   console.log(`<${result.join(', ')}>`)
  process.exit(0);
});