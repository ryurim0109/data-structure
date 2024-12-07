const readline =require('readline')

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});
const input = [];

class TreeNode{

  left
  right
  length
  list
  constructor(value){
    this.length = value.length;
    this.list =Array(26).fill(0);
    for(let i =0; i<this.length;i++){
      this.list[value[i].charCodeAt() - "a".charCodeAt()] ++;
    }
  }
}

class BinaryTree{
  root
  size
  constructor(){
    this.size = 0
  }
  isSame(a,b){
    if(a.length !== b.length)return false;
    for(let i=0; i<26; i++){
      if(a.list[i]===b.list[i]) continue;
      return false
    }
    return true

  }
  aThanB(a,b){
     for(let i=0; i<26; i++){
      if(a.list[i]===b.list[i]) continue;
     return a[i] > b[i] 
    }
  }
  push(value){
    const node = new TreeNode(value);
    if(!this.root){
      this.root = node;
      this.size ++;
      return
    }
    let cur = this.root
    while(cur){
      if(this.isSame(cur,node)) return
      if(this.aThanB(cur,node)){
          if(!cur.right){
          cur.right =node;
          this.size++;
          return
        }

        cur = cur.right;
        
      }else{
        if(!cur.left){
            cur.left = node;
            this.size ++;
            return
        }
        cur = cur.left;
      
      }
   
    }
  }

}
rl.on('line',(line)=>{
  input.push(line) 


}).on('close',()=>{
  const [N,...words] =input;
  const tree = new BinaryTree();

  for(let i =0; i<Number(N);i++){

    tree.push(words[i]);
  }

  console.log(tree.size)

  process.exit()
})


  // const obj={}
  // for(let i = 0; i<Number(N); i++){
  //   const word = words[i].split('').sort((a,b) => a>b?1:-1).join('');
  //   if(!obj[word]){
  //     obj[word]=0;
  //   }
  //   obj[word]++;   
  // }
  // console.log(Object.keys(obj).length);