

const readline = require('readline')
// 한수는 지금 (x, y)에 있다. 직사각형은 각 변이 좌표축에 평행하고, 왼쪽 아래 꼭짓점은 (0, 0), 오른쪽 위 꼭짓점은 (w, h)에 있다. 직사각형의 경계선까지 가는 거리의 최솟값을 구하는 프로그램을 작성하시오.

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout,
})

const getMin =(...list)=>{
  let min=list[0];
   for (let i=0; i<list.length; i++){
    if(min > list[i]){
      min =  list[i] 
    }
  } 
  return min
}

rl.on('line',(line)=>{
  const [x,y,w,h]= line.split(' ').map((el)=>Number(el));


console.log(getMin(x,y,w-x,h-y))


}).on('close',()=>{
  process.exit()

})


