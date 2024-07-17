import sys
import os

# 상위 디렉토리를 sys.path에 추가
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# 이제 stack.py를 import할 수 있습니다
from stack import Stack

#괄호 맞추기 ㅇㅖ제



def check_parentheses(parSeq):
    S = Stack()
    for p in parSeq:
        if p =='(':
          S.push(p)
        elif p ==')':
          S.pop()
        else:
          print('Not allowed Symbol')
          return False
    return len(S) == 0  # 스택이 비어있으면 True, 아니면 False


 


parSeq='(())'
result = check_parentheses(parSeq)
print(result)