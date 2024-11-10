const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input =[];
const result = []
rl.on('line',(line)=>{
  input.push(line);



}).on('close',()=>{
    const [N, ...caseList] = input;
    const solution=(words,i)=>{
       words = words.split(" ");
       const newWords = []
      while(words.length){
        newWords.push(words.pop());
      }
      result.push(`Case #${i}: ${newWords.join(" ")}`)

    }
    for(let i = 0; i<Number(N); i++){
      solution(caseList[i], i+1);
    }
    console.log(result.join('\n'))

  process.exit(0);
})
