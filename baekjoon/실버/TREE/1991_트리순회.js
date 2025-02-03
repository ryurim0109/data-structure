const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class TreeNode {
  value;
  left;
  right;
  constructor(value) {
    this.value = value;
  }
}

class Tree {
  root;
  constructor() {
    this.root = null;
  }

  getNode(value) {
    if (value === '.') return null;

    return this.findNode(this.root, value) || new TreeNode(value);
  }
  findNode(node, value) {
    if (!node) return null;
    if (node.value === value) return node;

    const leftNode = this.findNode(node.left, value);
    if (leftNode) return leftNode;

    return this.findNode(node.right, value);
  }

  connect(cur, left, right) {
    let curNode = this.getNode(cur);

    if (!this.root) {
      this.root = curNode;
    }
    curNode.left = this.getNode(left);
    curNode.right = this.getNode(right);
  }
  preOrder(node = this.root) {
    if (!node) return '';
    return node.value + this.preOrder(node.left) + this.preOrder(node.right);
  }

  // 중위 순회
  inOrder(node = this.root) {
    if (!node) return '';
    return this.inOrder(node.left) + node.value + this.inOrder(node.right);
  }

  // 후위 순회
  postOrder(node = this.root) {
    if (!node) return '';
    return this.postOrder(node.left) + this.postOrder(node.right) + node.value;
  }
}
let tree = new Tree();
let N;

rl.on('line', (line) => {
  if (!N) {
    N = Number(line);
    return;
  }

  const [value, left, right] = line.split(' ').map(String);
  tree.connect(value, left, right);
}).on('close', () => {
  console.log(tree.preOrder());
  console.log(tree.inOrder());
  console.log(tree.postOrder());

  process.exit();
});
