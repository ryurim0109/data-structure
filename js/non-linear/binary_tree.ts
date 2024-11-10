const binary_tree = `

중복을 허용하지 않고 집합을 표현한 자료구조
HashMap과 똑같이 구현하는 HashSet과 Heap과 같이 이진 트리를 이용하는 TreeSet이 있다.

단점: 값이 어떻게 구성되냐에 따라 성능이 굉장히 느려질 수 있다.

`

class TreeNode {
  value : string;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value:string){
    this.value = value;
  }
}

export class BinaryTree {
  root:TreeNode | null;

  constructor(){
    this.root = null;

  }

  isSame(a:string,b:string){
    return a === b;
  }

  AthanB(a:string, b:string){
    if(a.length === b.length){
      for(let i = 0; i < a.length; i++){
       const A =  a.charCodeAt(i);
       const B = b.charCodeAt(i);

       if(A === B) continue;

       return A > B;
          }
  
    }
    return a.length > b.length;
   
  }

  set(value:string){
    const node = new TreeNode(value);
    if(!this.root) {
      this.root = node;
      return
    };

    let cur = this.root;
    while(cur){
      if(this.isSame(cur.value , value)) return;
     
      if(this.AthanB(cur.value, value)){
        if(!cur.left){
           cur.left = node;
           return
        }
          cur = cur.left;
       
      } else{
        if(!cur.right){
           cur.right = node;
           return
        };
          cur = cur.right;
      };
    };

  };

  has(value:string){
    if(!this.root) return false;

    let cur = this.root;

    while(cur){
      if(this.isSame(cur.value, value)) return true;

       if(this.AthanB(cur.value, value)){
        if(!cur.left){
           return false
        }
        cur = cur.left;
       
      } else{
        if(!cur.right){
       return false
        };
          cur = cur.right;
      };

    };
    return false;

  };


  treeUp(prev:TreeNode, cur:TreeNode){

    const next = cur.right;
    if(!next) return;
    prev.right = next;
    if(cur.left){

    next.left = cur.left;
    }
  
    this.treeUp(cur,next);


  }

  remove(value:string){
    if(!this.root) return;
    let cur = this.root;
    let prev: TreeNode | undefined;

    while(cur){
      if(this.isSame(cur.value, value)){
        if(!prev) {
          this.root = null;
          //제거해~
          return;
        }
        // left 인지  right인지
        this.treeUp(prev,cur);
        return
      };
      //  빙글빙글 돌면서 값 넣어주기
      if(this.AthanB(cur.value, value)){
      if(!cur.left) return;
        prev = cur
        cur = cur.left;  

      } else{
        if(!cur.right)return;
        prev = cur;
        cur = cur.right;
      };
      

    };


  }

}

