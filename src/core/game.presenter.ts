import { Card, CardSlot, Layer, levelZ } from './card.entity';

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
  layer: Layer[];
  allCard: Card[];
  cardSlot: CardSlot;
}

const defaultState: () => IViewState = () => {
  return {
    layer: [],
    allCard: [],
    cardSlot: new CardSlot(),
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
    // console.log(cards.map((v) => v.type));
    // console.log(data.map((v) => v.type));

    function getCard() {
      return data.pop();
    }
    const l1 = new Layer(
      [
        [getCard(), getCard(), getCard(), getCard(), getCard()],
        [getCard(), 0, 0, 0, getCard()],
        [getCard(), 0, 0, 0, getCard()],
        [getCard(), 0, 0, 0, getCard()],
        [getCard(), getCard(), getCard(), getCard(), getCard()],
      ],
      0,
      0,
      levelZ(1),
    );

    const l2 = new Layer(
      [
        [getCard(), getCard(), getCard(), getCard()],
        [getCard(), 0, 0, getCard()],
        [getCard(), 0, 0, getCard()],
        [getCard(), getCard(), getCard(), getCard()],
      ],
      10,
      10,
      levelZ(2),
    );

    const l3 = new Layer(
      [
        [getCard(), getCard(), getCard()],
        [getCard(), 0, getCard()],
        [getCard(), getCard(), getCard()],
      ],
      20,
      20,
      levelZ(3),
    );

    this.state.layer = [l1, l2, l3];
    this.state.allCard = cards;
    this.checkBlock();
    this.forceUpdate();
  }

  click(c: Card) {
    this.state.cardSlot.add(c);
    this.checkBlock();
    this.forceUpdate();
  }

  checkBlock() {
    let c = 0;
    console.log(this.state.allCard.length, 'allCard');
    this.state.allCard.forEach((a) => {
      this.state.allCard.forEach((b) => {
        if (a !== b) {
          if (a.intersect(b)) {
            c += 1;
            console.log(c);
            // if (a.z > b.z) {
            //   b.isBlocked = true;
            // } else {
            //   a.isBlocked = true;
            // }
          }
        } else {
          console.log('equal');
        }
      });
    });
  }

  forceUpdate = () => {};
}
