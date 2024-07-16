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
