const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});


rl.on('line',(line)=>{

  const result = [];
  const n = Number(line);
  const queue = [];

  for(let i= 1; i<=n; i++){
    queue.push(i);
  }

  while(queue.length > 1){
    result.push(queue.shift());
    queue.push(queue.shift());
  }

  console.log([...result,...queue].join(' '))



}).on('close',()=>{
  

  process.exit(0);
})
