const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output:process.stdout
})

const input = [];
const result = [];
rl.on('line',(line)=>{
  input.push(line);

}).on('close',()=>{
  const [N,...caseList] = input;

  const stack =[];

  const isInteger =(number)=>{
 return number % 1 ===0
  }



  for(let i = 0; i < caseList.length ; i++){
  
    const caseType = caseList[i]
 
    const [A,B] = caseType.split(" ");
  
    switch(A){
      case '1':
        stack.push(parseInt(B));
        break;
      case '2':
        if(stack.length){
          result.push(stack.pop());
          break;
        }
        result.push(-1);
        break;
        case '3':
        result.push(stack.length);
        break;
        case '4':
        let num = 1
        if(stack.length){
          num = 0
        }
        result.push(num)
        break;
        case '5':
        if(stack.length){
          result.push(stack[stack.length - 1]);
          break;
        }
        result.push(-1);
        default:
       
        break;
      
    }
  }
  console.log(result.join('\n'))

  process.exit(0);
})

