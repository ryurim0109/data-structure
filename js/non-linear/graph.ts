const 설명 =`Graph

그래프의 요소
필수 요소
-Vertex 노드
-Edge 간선

옵션요소
-Direction 방향
-Weight 가중치

그래프 구현
각 노드 정의
노드에 연결 리스트로 간선 구현
인접 행렬(Matrix)구현

메모리 구조를 알아야 진짜 그래프 구조를 그릴 수 있다.


const 노드리스트 = [new Vertex(), new Vertex()];
const 인접 행렬 = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]
연결되지 않아도 하나의 그래프이다.

그래프 왜 그리느냐 ? 관계 구할 때 필요!
관계를 이해하기 위해서 
특정 노드 콕 찝었을 때 그친구와 연결 되어있는 모든 노드들을 순회한다.
` 

const 그래프순회 = `
알고리즘 
네이밍
브루트 포스 : 모든 경우의 수를 다 검사한다. (brute force) - 완전 탐색
1. Breadth-First Search 너비 우선 탐색 : queue 로 순회
2. Depth-First Search 깊이 우선 탐색 :stack으로 순회


`

// 무 방향 그래프

// export class Vertex<T>{
//   // //4자리 : 문자 1자 4바이트 => 16바이트 
//   // id: '0001';
//   list:number[];
//   data: T;

//   constructor(data:T){
//     this.data = data; // 인접 노드 리스트
//     this.list = []
//   }

// }

export class Graph<T> {
  size:number;
  vertexList:T[];
  edgeMatrix:number[][]; //인접 행렬 

  constructor(){
    this.size = 0;
    this.vertexList=[];
    this.edgeMatrix =[];
  }
  insert(data:T){
    this.edgeMatrix.push(Array(this.size).fill(0));
    this.size++;
    // const vertex = new Vertex(data)
    this.vertexList.push(data);

    for(let i = 0; i<this.size; i++){
      // this.edgeMatrix[i][this.size]=false;
      this.edgeMatrix[i].push(0);
    }
  }

  connect(idx1:number, idx2:number){
    if(this.size - 1 < idx1 ) return
    if(this.size - 1 < idx2 ) return


    this.edgeMatrix[idx1][idx2]=1;
    this.edgeMatrix[idx2][idx1]=1;
    // this.vertexList[idx1].list.push(idx2);
    // this.vertexList[idx2].list.push(idx1);
  }

  cycle(idx:number){
    if(this.size < idx) return;
    const visit = Array(this.size).fill(0);
    const friends:number[] = []

    // const dfs =(idx:number)=>{
    //   const list = this.edgeMatrix[idx];
    //   const node = idx;
    //   if(visit[node]) return;
    //   visit[node] = 1;
    //   friends.push(node);

    //   for(let i = 0 ; i<list.length; i++){

    //       const isBetween = list[i];
    //       if(!isBetween) continue;
    //       if(visit[i]) continue

    //    dfs(i)

    //     };

    // };
    // dfs(idx)
    // return friends;
    return this.BFS(idx)
  };

  BFS(idx:number){
    const queue = [idx];
    let qIdx = 0;
    const visit = Array(this.size).fill(0);
    const friends:number[] = []
    while(queue.length !== qIdx){
      const node = queue[qIdx];
      qIdx++;
      if(visit[node]) continue;
      
      friends.push(node)
      visit[node]=1;

      const list = this.edgeMatrix[node];
      for(let i = 0; i < list.length; i++){
          const isBetween = list[i];
          if(!isBetween) continue;
        if(visit[i]) continue;
        queue.push(i);
      };

    };
    return friends;
  }

  DFS(idx:number){
  const stack:number[]=[idx];
  const visit = Array(this.size).fill(0);
  const friends:number[] = []

  //가지치기 필수!
    while(stack.length){
      const node = stack.pop()!;
       if(visit[node]) continue;
      

      visit[node] = 1;
      friends.push(node);
      const list = this.edgeMatrix[node];
      for(let i = 0 ; i<list.length; i++){

          const isBetween = list[i];
          if(!isBetween) continue;
          if(visit[i]) continue

          stack.push(i);

        }
        return friends;
    }
  };
}