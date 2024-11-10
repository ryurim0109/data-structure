const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout,
})

rl.on('line',(line)=>{
  const [a,b] =line.split(' ').map((el)=>Number(el))
  console.log(a+b) 


}).on('close',()=>{
  process.exit()
})