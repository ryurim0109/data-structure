const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 카드게임 - 분리집합 알고리즘

let input = [];
const result = [];
let [N, M, K] = [];
let deck = [null];
let cards = [];
rl.on('line', (line) => {
  if (!N) {
    [N, M, K] = line.split(' ').map(Number);
    return;
  }
  if (deck.length === 1) {
    const input = line
      .split(' ')
      .map(Number)
      .sort((a, b) => a - b);

    for (let i = 0; i < M; i++) {
      while (deck.length <= input[i]) {
        deck.push(input[i]);
      }
    }

    return;
  }
  cards = line.split(' ').map(Number);

  for (let i = 0; i < K; i++) {
    const curCard = cards[i];
    if (curCard === deck[deck.length - 1]) {
      result.push(find(cards[1]));
    } else {
      result.push(find(cards[i] + 1));
    }
  }
  console.log(result.join('\n'));
}).on('close', () => {
  process.exit();
});

const find = (idx) => {
  const deckCard = deck[idx];
  if (deckCard !== idx) {
    return find(deckCard);
  }
  if (deck[idx] === M) {
    deck[idx] = deck[1];
  } else {
    deck[idx] = deck[idx + 1];
  }

  return deckCard;
};
