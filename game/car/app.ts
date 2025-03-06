import readline from 'readline';

// Terminal 설정 (에코 끄기)
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  const clear = () => {
    process.stdout.write('\x1Bc');
  };
  clear();
  const isBomb = () => {
    return queue[13] === myPos;
  };
  const getRandom = () => {
    return Math.floor(Math.random() * 3);
  };
  // 화면에 글자가 보이지 않도록 처리
  readline.emitKeypressEvents(process.stdin);

  const makeRoad = () => Array.from({ length: 15 }, () => Array(3).fill(0));

  let cnt = 1;
  const queue = Array(15).fill(null);
  queue[0] = 0;
  let speed = 100;

  let intervalId: any;
  const frame = () => {
    intervalId = setInterval(() => {
      cnt++;
      let insert: number | null = null;
      if (cnt % 5 === 0) {
        insert = getRandom();
      }
      if (cnt % 50 === 0) {
        speed = Math.max(speed - 10, 10);
        clearInterval(intervalId);
        frame();
      }
      queue.unshift(insert);
      queue.pop();
      printRoad();
    }, speed);
  };
  frame();

  const myCar = '▤';
  const outerCar = '□';

  let myPos = 1;

  const printRoad = () => {
    const road = makeRoad();
    clear();
    road[road.length - 2][myPos] = 1;
    queue.forEach((el, idx) => {
      if (el === null) return;
      road[idx][el] = 2;
    });
    const roadSt = road
      .map(
        (el) =>
          `| ${el
            .map((obj) => {
              if (!obj) return ' ';
              if (obj === 1) return myCar;
              if (obj === 2) return outerCar;
            })
            .join(' | ')} |`
      )
      .join('\n');

    process.stdout.write(roadSt);
    if (isBomb()) {
      console.log('--The END--');
      process.exit(0);
    }
  };

  printRoad();

  process.stdin.on('keypress', (char, key) => {
    // key와 char는 입력된 키 정보를 담고 있습니다.

    const isCtrl = key.ctrl;
    if (isCtrl) {
      switch (key.name) {
        case 'c':
          console.log('Ctrl+C detected, exiting...');
          process.exit();
      }
    } else {
      switch (key.name) {
        case 'a':
          myPos = Math.max(0, myPos - 1);
          break;
        case 'd':
          myPos = Math.min(2, myPos + 1);
          console.log('우\n');
          break;
      }
      printRoad();
    }

    // Ctrl+C를 눌렀을 때 종료
    if (key && key.ctrl && key.name === 'c') {
      console.log('\nCtrl+C detected, exiting...');
      process.exit();
    }
  });
} else {
  console.log('Not a TTY.');
}
