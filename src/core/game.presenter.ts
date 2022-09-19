import { Card, Layer } from './card.entity';

export function shuffle(input: any[]) {
  const arr = [...input];
  let length = arr.length,
    temp,
    random;
  while (0 !== length) {
    random = Math.floor(Math.random() * length);
    length -= 1;
    temp = arr[length];
    arr[length] = arr[random];
    arr[random] = temp;
  }
  return arr;
}
/**
 * 每个盒子模块
 */

interface IViewState {
  data: Layer[];
}

const defaultState: () => IViewState = () => {
  return {
    data: [],
  };
};

export class GamePresenter {
  state: IViewState;
  constructor() {
    this.state = defaultState();
  }

  /**
   * 初始化3层
   */
  init() {
    let nums = 16 + 12 + 8;
    const types = Array(nums / 3)
      .fill(0)
      .map((_, i) => {
        return i % 7;
      });
    const cards: Card[] = [];

    for (let i = 0; i < nums; i++) {
      const element = new Card(types[i % 12]);
      cards.push(element);
    }

    const data = shuffle(cards);
    console.log(cards.map((v) => v.type));
    console.log(data.map((v) => v.type));

    function getCard() {
      return data.pop();
    }
    const l1 = new Layer([
      [getCard(), getCard(), getCard(), getCard(), getCard()],
      [getCard(), 0, 0, 0, getCard()],
      [getCard(), 0, 0, 0, getCard()],
      [getCard(), 0, 0, 0, getCard()],
      [getCard(), getCard(), getCard(), getCard(), getCard()],
    ]);

    const l2 = new Layer([
      [getCard(), getCard(), getCard(), getCard()],
      [getCard(), 0, 0, getCard()],
      [getCard(), 0, 0, getCard()],
      [getCard(), getCard(), getCard(), getCard()],
    ]);

    const l3 = new Layer([
      [getCard(), getCard(), getCard()],
      [getCard(), 0, getCard()],
      [getCard(), getCard(), getCard()],
    ]);

    this.state.data = [l3];
  }
}
