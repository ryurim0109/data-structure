const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout,
})

const input = [];
const result =[];
class TreeNode{
  value
  left
  right
  constructor(value){
    this.value = value;
  }
  
};

class BinaryTree{
  root 
  constructor(){}

  AThanB(a,b){
    return a.value>b.value

  }
  set(value){
    const node = new TreeNode(value);
    if(!this.root){
      this.root = node;
      return
    }
    if(this.root.value *2 <=node.value){
      node.left = this.root;
      this.root =node;
      return 
    }
    let cur = this.root;
    while(cur){
      if(cur.value === node.value) return
      if(this.AThanB(cur,node)){
        if(!cur.left){
          cur.left = node;
          return
        }
        cur = cur.left;

      }else{
        if(!cur.right){
          cur.right = node;
          return
        }
        cur = cur.right;

      }
    }
  }
  has(value){
    let cur = this.root;

    while(cur){
      if(cur.value === value) return 1;
      if(cur.value> value){
        if(!cur.left)return 0
        cur = cur.left;

      }else{
        if(!cur.right)return 0
        cur = cur.right;

      }

    }
    return 0;
  }
  
};

rl.on('line',(line)=>{
  input.push(line.split(' ').map(Number))


}).on('close',()=>{
  const [[T],...list] = input;

  function solution([n],[...nList],[m],[...mList]){
    const tree = new BinaryTree()
    for(let i =0; i<n; i++){
      tree.set(nList[i])
    }
    for(let i =0; i<m; i++){
      result.push(tree.has(mList[i]))
    }


   
  }
  for(let i=0; i<T; i++){
    solution(...list.slice(i*4,(i+1)*4));
  }
  console.log(result.join('\n'))
  process.exit()
});


// const readline = require('readline');

// const rl = readline.createInterface({
//   input:process.stdin,
//   output:process.stdout,
// })

// const input = [];
// const result =[]
// rl.on('line',(line)=>{
//   input.push(line.split(' ').map(Number))


// }).on('close',()=>{
//   const [[T],...list] = input;

//   function solution([n],[...nList],[m],[...mList]){
//     const visit = [];
//     for(let i = 0; i<nList.length; i++){
//       visit[nList[i]]=1;
//     }
//     for(let i = 0; i<mList.length; i++){
//       result.push(visit[mList[i]]?1:0);
//     }
//   }
//   for(let i=0; i<T; i++){
//     solution(...list.slice(i*4,(i+1)*4));
//   }
//   console.log(result.join('\n'))
//   process.exit()
// });