// import { LinkedList } from './array/linked_list';

import { Queue } from './array/queue';
import {BinaryTree} from './non-linear/binary_tree';
import {Graph, } from './non-linear/graph';
import { Heap, HeapNodeType } from './non-linear/heap';

// import { HashMap } from './dic/hash/hash_map';

// const list = new LinkedList(0);
// const poping = list.push(5).push(10).push(100).pop();
// console.log(poping);

// const hashMap = new HashMap(2);
// hashMap.setValue('최도영', '0');
// hashMap.setValue('김유림', '6');
// hashMap.setValue('문선영', '5');
// hashMap.setValue('송담', '3');
// hashMap.setValue('트립소다', '1');
// hashMap.setValue('도도라기', '123');
// console.log(JSON.stringify(hashMap,null,1));

// console.log(hashMap.getValue('도도라기'))

// const list: any[] = [
//   { name: '1', score: 50 },
//   { name: '2', score: 10 },
//   { name: '3', score: 20 },
//   { name: '4', score: 40 },
// ];

// const heap = new Heap();
// list.forEach((el) => heap.insert(el));
// console.log(heap);

// while (heap.size > 0) {
//   console.log(heap.takeout());
// }

// const queue = new Queue<number>();

// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.enqueue(4);
// queue.enqueue(5);
// console.log(queue);
// while (!queue.isEmpty) {
//   console.log(queue.dequeue());
// }


// const graph = new Graph();
// console.log(graph);

// graph.insert('토토')
// graph.insert('메롱')
// graph.insert('롱롱')
// graph.insert('토메')
// graph.insert('토잉')

// graph.connect(0,1)
// graph.connect(1,3);
// graph.connect(2,4);
// graph.connect(4,5);

// console.log(graph)
// console.log(graph.cycle(0));



// const end = 8;
// const input =[
//   [4,3],
//   [7,5],
//   [4,4]
// ]

// const evList = input.map(([first, plus])=>{
//   const list = [];
//   for(let i = 0; i<end; i++){

//   }
// })

// const queue = new Queue<number>();
// while(queue.length){
//   const cur = queue.dequeue() as number;

//   for (let ev=0; ev <evList.length; ev++){
//   if(!evList[ev][cur]) continue;
//   const nextList = evList[ev];
//   for(let next = 0; next< nextList.length; next++){
//     if(!nextList[next]) continue;
//     if(next ===8){
//       console.log('end');
//       break;
//     }
//     queue.enqueue(next);
//   }
// }
// }

const tree = new BinaryTree();

tree.set('킴송담');
tree.set('킴가가');
tree.set('킴가나');
tree.set('킴가다');
tree.set('킴가오');

console.log(JSON.stringify(tree));

tree.remove('킴가오')

console.log(JSON.stringify(tree));