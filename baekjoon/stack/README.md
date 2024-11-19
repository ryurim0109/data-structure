# 스택

- 말미잘 입으로 먹고 입으로 배출
- LIFO

```py
class Stack:
  def __init__(self):
    # 생성 함수 데이터 저장을 위한 리스트 준비
    self.items =[]
  def push(self,val):
    # O(1)
    self.items.append(val)
  def pop(self):
    try:
      return self.items.pop()
    except:
        print("Stack is empty")
  def top(self):
    try:
      return self.items[-1]
    except:
        print("Stack is empty")
  def __len__(self):
    return len(self.items)



S = Stack()
S.push(10)
S.push(2)
print(S.pop())  # 2
print(S.top())  # 10
print(len(S))   # 1

```

---

```ts
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

console.log(stack.size()); // 2
console.log(stack.top()); // 'B'
```

```
 npm install -g ts-node
 ts-node stack.ts
```

---

## 활용 예제

1. 괄호 맞추기
2. 계산기
