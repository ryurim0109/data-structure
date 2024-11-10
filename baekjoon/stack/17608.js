const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output:process.stdout
})

const input = []
rl.on('line',(line)=>{
  input.push(Number(line));


}).on('close',()=>{
  const [N, ...heightList]= input;

  let maxHeight = 0;
  let count = 0;

  while(heightList.length){
    const cur = heightList.pop();

    if(maxHeight < cur){
      count++;
      maxHeight = cur;
      if(maxHeight ===100_000){
        break;
      }
    }
  }

console.log(count)
  process.exit(0);
})


  // for(let i= N-1; i>=0; i--){
  //   const cur = heightList[i];
  //   if(maxHeight < cur){
  //     count++;
  //     maxHeight = cur
  //   }

  // }