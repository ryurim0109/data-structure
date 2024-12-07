const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout,
})

const input = [];
rl.on('line',(line)=>{
 input.push(line) 


}).on('close',()=>{
  const [info, ...board]=input;
  
  const [Y,X] = info.split(" ").map(Number);
  let min = 64;
  const color = ['W','B']
  for(let c=0; c<2; c++){

  for(let y=0; y <= Y -8; y++){
    for(let x=0; x<= X-8; x++){
      let count =0;
       let ySum= 0
     
      for(let i = y; i<y+8; i++){
       
        let xSum =0;
        
        for(let j=x; j<x+8; j++){
       
           const cur = color[(c + ySum + xSum) %2];

           if(board[i][j]!==cur){
            count++;
           }

          xSum ++;
      
        }
        ySum ++
      }
    if(count<min){
      min = count
    }
    if(!min){
      console.log(0);
      process.exit()
    }
    }
  }
  }

 console.log(min)
  process.exit()
})