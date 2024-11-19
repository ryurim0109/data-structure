class LinkedNode<T> {
  data: T;
  next?: LinkedNode<T>;
  constructor(data: T) {
    this.data = data;
  }

  static push<T>(head: LinkedNode<T>, data: T) {
    const node = new LinkedNode(data);
    let current = head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }

  static pushAt<T>(head: LinkedNode<T>, idx: number, data: T): LinkedNode<T> {
    const node = new LinkedNode(data);
    let current = head;
    let count = 0;
    if (!idx) {
      node.next = head;
      return node;
    }
    while (current.next && count < idx - 1) {
      current = current.next;
    }
    if (!current.next) throw new Error('error');
    node.next = current.next;
    current.next = node;
    return head;
  }

  static pop<T>(head: LinkedNode<T>): T | undefined {
    if (!head.next) return head.data;
    let current = head;
    while (current.next && current.next.next) {
      current = current.next;
    }
    const poppedData = current.next!.data;
    current.next = undefined;
    return poppedData;
  }

  static printAll<T>(head: LinkedNode<T>) {
    let current = head;
    while (current.next) {
      console.log(current.data);
      current = current.next;
    }
    console.log(current.data);
  }
}

export class LinkedList<T> {
   head: LinkedNode<T>;
  protected _size:number = 0;

  constructor(data: T) {
    this.head = new LinkedNode(data);
    this._size = 1;
  }

  get size(){
    return this._size;
  }

  push(data: T) {
    this._size++
    LinkedNode.push(this.head, data);
    return this;
  }

  pop() {
    return LinkedNode.pop(this.head);
  }

  pushAt(idx: number, data: T) {
    this._size++
    LinkedNode.pushAt(this.head, idx, data);
    return this;
  }

  print() {
    LinkedNode.printAll(this.head);
    return this;
  }
}
