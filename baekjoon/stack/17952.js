// 과제는 끝ㄴㅏ지 않아!
const readline = require('readline');
const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});


class Stack {
  list
  capacity
  rear

  constructor(capacity){
    this.capacity = capacity
    this.list = []
    this.rear = 0;
  }
  push(value){
    this.list[this.rear % this.capacity] = value;
    this.rear++;
  }
  pop(){
  if(!this.list.length) undefined;
  this.rear--;
  const node = this.list[this.rear % this.capacity] 
   this.list[this.rear % this.capacity] =null;
  
   
   return node;
  }
}

const input = [];
let result = 0;
rl.on('line',(line)=>{
input.push(line.split(" ").map(Number));


}).on('close',()=>{
  const [[N],...caseList]= input;
  const stack = new Stack(N);

  for(let i =0; i< caseList.length; i++){
    const [hasWork,score,time] = caseList[i];

    if(hasWork){
      stack.push([score,time]);
    }
      const work = stack.pop();
      if(!work) continue;
      work[1]--;
      if(!work[1]) {
        result += work[0];
      }else{
        stack.push(work)
      }
    
  }
  console.log(result);
  process.exit();
});
