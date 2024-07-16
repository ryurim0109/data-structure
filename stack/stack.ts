interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  top(): T | undefined;
  size(): number;
}

//implements Stack에 IStack가 없으면 에러 리턴
class Stack<T> implements IStack<T> {
  private storage: T[] = []; // 스택 스토리지

  constructor(private capacity: number = Infinity) {}

  push(item: T): void {
    if (this.size() === this.capacity) {
      throw new Error('Stack has reached max capacity');
    }
    this.storage.push(item);
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  top(): T | undefined {
    return this.storage[this.size() - 1];
  }

  size(): number {
    return this.storage.length;
  }
}

const stack = new Stack<string>();
stack.push('A');
stack.push('B');
stack.push('C');
stack.push('D');
stack.push('E');

console.log(stack.size()); // 5
console.log(stack.top()); // 'E'
console.log(stack.pop()); // 'E'
