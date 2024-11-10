const 설명 = `

  배열을 이야기 할 때 빠질 수 없는  것은 결국 메모리이다.
  배열이란 직렬화된 메모리에 값을 나열하고 그 첫번째 메모리 주소를 저장해 가지고 있는 것이 배열이기 때문,

  메모리의 핵심은 결국 메모리를 얼마나 점유 하느냐에 있다.
  그레서 기존의 모든 배열은 항상 사이즈를 가지고 있다.

  고정된 사이즈를 가진 배열의 특징이 데이터의 양을 예측할 수 없는 다양한 케이스로부터
  오버플로우로 인해 난항을 겪지 않도록 동적 배열을 만들게 된다.

  추가로 우리가 사용하는 string도 사실 배열
  왜 다이나믹  큐 스택은 없을까?

`

export class DynamicArray<T>{
  capacity:number;
  size:number;
  list:T[];
  tail:number;

  constructor(capacity:number, list:T[]){
    this.capacity = capacity;
    this.list = list;
    this.tail = 0;
    this.size = 0;
  }

  resize(minSize?:number){
    let newCapacity = this.capacity
    if(minSize){

      while(minSize > newCapacity){
        newCapacity *= 2
      }

    }
    const newList:T[]=[]
    for(let i=0; i<this.size;i++){
      newList[i] = this.list[i];
    }
    if(newCapacity !== this.capacity){

    this.capacity*=2;

    }else{
      this.capacity = newCapacity;
    }

    this.list = newList;
  }

  at(idx:number){
    if(idx>this.capacity){
        //todo 사이즈 동기화
      this.resize(idx)
    }

  
    return this.list[idx];

  }

  set(idx:number, value:T){
    if(idx > this.capacity){
      this.resize(idx);
    };
    this.list[idx]=value;

  }

  push(value:T){
    this.list[this.tail] = value;
    if(this.size){
        this.tail ++;
    }
    this.size ++;
    if(this.size ===this.capacity){
      this.resize();
    }
  

  }

  pop(){
    if(!this.size) return undefined;
    const node = this.list[this.tail];
    if(this.tail){
    this.tail --;
    }
 
    this.size --;
    return node;

  }
}