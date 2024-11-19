# 큐

- 사람 입으로 먹고 아래로 배출
- FIFO (선착순) 규칙의 순차적 자료구조

```py
class Queue:
  def __init__(self):
    self.items=[]
    self.front_index = 0
  def enqueue(self,val):
    self.items.append(val)
  def dequeue(self):
    if self.front_index == len(self.items):
        print('Queue is Empty!')
        return None
    else:
      x = self.items[self.front_index]
      self.front_index += 1
      return x



Q = Queue()
Q.enqueue(5)
Q.enqueue(-2)
Q.enqueue(3)

print(Q.dequeue()) #5
print(Q.dequeue()) #-2
print(Q.dequeue()) # 3
print(Q.dequeue()) # Queue is Empty!

```

```ts
interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  size(): number;
}

class Queue<T> implements IQueue<T> {
  private storage: T[] = [];

  constructor(private capacity: number = Infinity) {}

  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error('Queue has reached max capacity');
    }
    this.storage.push(item);
  }
  dequeue(): T | undefined {
    return this.storage.shift();
  }
  size(): number {
    return this.storage.length;
  }
}

const Q = new Queue<number>();
Q.enqueue(1);
Q.enqueue(2);
console.log(Q.dequeue()); // 1
```

## 활용 예제

- Josephus problem
