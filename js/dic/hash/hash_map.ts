import {LinkedList} from "../../array/linked_list";

class HashNode {
  key: string;
  val: string;
  constructor(key: string, val: string) {
    this.key = key;
    this.val = val;
  }

  validate(key: string) {
    return this.key === key;
  }
}

class HashLinkedList extends LinkedList<HashNode>{
  constructor(data:HashNode){
    super(data);
  };



  getValueByKey(key:string){
    let current = this.head;
   
    while(current){
      if(current.data.validate(key)) return current;
      current = current.next as any;
    };

    return undefined;
  };

};

export class HashMap {
  list: HashLinkedList[] = [];
  size: number = 8;
  maxLinkedListSize = 4;

  constructor(size?: number) {
    if (size) {
      this.size = size;
    }
  }
  hash(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % this.size;
    }
    return (hash + key.length) % this.size;
  }

  resize(){

    const newList:HashLinkedList[] =[]
    
    // 1. size up  
    this.size *= 2;
    // 2. 기존 요소들을 돌며 링크드 리스트를 찾는다.
    for(let i = 0; i<this.list.length; i++){
      const linkedList =this.list[i];
      if(!this.list[i]) continue;

      // 3. 찾은 링크드 리스트를 돌며 새 해시함수를 실행해 값을 적재한다.
      
      let current = linkedList.head;

      while(current){

        const hash = this.hash(current.data.key);
        const newNode = new HashNode(current.data.key,current.data.val)

        if(!newList[hash]){
          newList[hash] = new HashLinkedList(newNode);
        }else{
          newList[hash].push(newNode);
        };
        current =current.next as any;
      };
    };
    this.list = newList

  };

  // map size up
  // resize() {
  //   this.size = this.size * 2;
  //   const newList: HashLinkedList[] = [];
  //   for (let i = 0; i < this.list.length; i++) {
  //     const node = this.list[i];
  //     if (!node) continue;
  //     const hash = this.hash(node.key);
   

  //     newList[hash] = node;
  //   }
  //   this.list = newList;
  // }

  
  setValue(key: string, value: string) {
    let hash = this.hash(key);

    const linkedList = this.list[hash];
    if(!linkedList){
      this.list[hash] = new HashLinkedList(new HashNode(key,value));
      return
    }

    if(linkedList.size>=this.maxLinkedListSize){
      this.resize();
      this.setValue(key,value);
      return;
    }
 

    //내 키값이 있는지 확인
    const node = linkedList.getValueByKey(key);
    if(!node) {
      linkedList.push(new HashNode(key,value));
      return;
    }
    node.data.val = value;

    // if (prevNode && !prevNode.validate(key)) {
    //   this.resize();
    //   this.setValue(key,value)
    // }

    // hash = this.hash(key);
    // const node = new HashNode(key, value);
    // this.list[hash] = node;
  }
  getValue(key: string) {

    const hash = this.hash(key);
    const linkedList = this.list[hash];
    if(!linkedList) return undefined

    // Todo linkedList 안에서 내 키값이 존재하면  return
    // 존재하면 value 안하면 undefined
     const node = linkedList.getValueByKey(key);
     if(node) return node.data.val;
     
     return undefined;



    // const hash = this.hash(key);
    // const node = this.list[hash];
    // if (node && node.validate(key)) return node.val;
    // return undefined;
  }
}









// export const list: HashNode[] = [];
// const size = 8;
// export const setValue = (k: string, v: string) => {
//   const hash = makeHash(k);
//   if (list[hash] && !list[hash].validate(k)) {
//     throw new Error('충돌!');
//   }

//   list[hash] = new HashNode(k, v);
// };
// export const getValue = (k: string) => {
//   const hash = makeHash(k);
//   return list[hash];
// };
// const resize = () => {};

// export const makeHash = (k: string): number => {
//   let hash = 0;
//   for (let i = 0; i < k.length; i++) {
//     hash = (hash * 31 + k.charCodeAt(i)) % size;
//   }
//   return hash;
// };
