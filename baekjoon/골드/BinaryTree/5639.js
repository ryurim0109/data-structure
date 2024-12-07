const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
/**
 * 이진 검색 트리
 * 전위 순회 - 스택 (집어넣을 때 출력)
 * 후위 순회 -스력 (집어넣고 뺠 때 출력)
 * 트리 복원 후 후위 순회로 바꾸기
 */

class TreeNode {
  value;
  left;
  right;
  constructor(value) {
    this.value = value;
  }
}
class BinaryTree {
  root;
  constructor() {}

  AThanB(a, b) {
    return a.value > b.value;
  }

  push(value) {
    const node = new TreeNode(value);
    if (!this.root) {
      this.root = node;
      return;
    }

    let cur = this.root;
    while (cur) {
      if (this.AThanB(cur, node)) {
        // left
        if (!cur.left) {
          cur.left = node;
          return;
        }
        cur = cur.left;
      } else {
        //right
        if (!cur.right) {
          cur.right = node;
          return;
        }
        cur = cur.right;
      }
    }
  }
  print() {
    const result = [];
    const DFS = (node) => {
      if (node.left) {
        DFS(node.left);
      }
      if (node.right) {
        DFS(node.right);
      }
      result.push(node.value);
    };
    DFS(this.root);
    return result;
  }
}
let tree = new BinaryTree();
rl.on('line', (line) => {
  tree.push(Number(line));
}).on('close', () => {
  console.log(tree.print().join('\n'));
  process.exit();
});
