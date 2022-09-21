import { Card, CardSlot, ECardType, Layer, levelZ } from './card.entity';

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
    let nums = 16 + 12 + 8 + 2 + 12 + 16;
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
      const c = data.pop();
      c.deleted = false
      return c
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
      20,
      30,
      levelZ(2),
    );

    const l3 = new Layer(
      [
        [getCard(), getCard(), getCard()],
        [getCard(), 0, getCard()],
        [getCard(), getCard(), getCard()],
      ],
      40,
      60,
      levelZ(3),
    );

    const l4 = new Layer(
      [
        [getCard(), 0, getCard()],
      ],
      40,
      60,
      levelZ(4),
    );
    const l5 = new Layer(
      [
        [getCard(), getCard(), getCard(), getCard()],
        [getCard(), 0, 0, getCard()],
        [getCard(), 0, 0, getCard()],
        [getCard(), getCard(), getCard(), getCard()],
      ],
      20,
      30,
      levelZ(5),
    );
    const l6 = new Layer(
      [
        [getCard(), getCard(), getCard(), getCard(), getCard()],
        [getCard(), 0, 0, 0, getCard()],
        [getCard(), 0, 0, 0, getCard()],
        [getCard(), 0, 0, 0, getCard()],
        [getCard(), getCard(), getCard(), getCard(), getCard()],
      ],
      0,
      0,
      levelZ(6),
    );



    this.state.layer = [l1, l2, l3, l4, l5, l6];
    this.state.allCard = cards;
    this.checkBlock();
    this.forceUpdate();
  }

  click(c: Card) {
    if (!c.isBlocked) {
      this.state.cardSlot.add(c)
      this.forceUpdate()
      this.state.cardSlot.remove(c).then(() => {
        this.forceUpdate()
        this.state.cardSlot.refresh()
        this.checkBlock();
        this.forceUpdate();
      });


    }
  }

  autoRemove() {
    const window = {} as Record<ECardType, Card[]>
    const canClick = this.state.allCard.filter(v => !v.deleted && !v.isBlocked)

    let i = 0
    let target: Card[] = []
    while (i < canClick.length) {
      const v = canClick[i]
      i += 1
      if (window[v.type]) {
        window[v.type].push(v)
      } else {
        window[v.type] = []
      }

      if (window[v.type].length === 3) {
        target = [...window[v.type]]
        break
      }
    }

    if (target.length) {
      const v = target.pop()
      if (v) {
        this.click(v)
      }
      const timer = setInterval(() => {
        const v = target.pop()
        if (v) {
          this.click(v)
        } else {
          clearInterval(timer)
          this.autoRemove()
        }
      }, 300)

    } else {
      alert('无解')
    }

  }

  checkBlock() {
    this.state.allCard.forEach(v => {
      v.isBlocked = false
    })

    this.state.allCard.forEach((a) => {
      this.state.allCard.forEach((b) => {
        if (a !== b) {
          if (!(a.deleted || b.deleted)) {
            if (a.intersect(b)) {
              if (a.z > b.z) {
                b.isBlocked = true;
              } else {
                a.isBlocked = true;
              }
            }
          }
        }

      });
    });
    this.forceUpdate()
  }

  forceUpdate = () => { };
}
