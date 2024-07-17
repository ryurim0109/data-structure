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



# S = Stack()
# S.push(10)
# S.push(2)
# print(S.pop())  # 2
# print(S.top())  # 10
# print(len(S))   # 1
