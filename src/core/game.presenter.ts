import { entry, injectable, Presenter ,} from '@clean-js/presenter';
import { Card, levelZ } from './card';
import { Layer } from './layer';
import { CardSlot } from './slot.entity';

entry.showDevtool()

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


interface IViewState {
  data: {
    id: number

    left: number;

    top: number;

    z: number;

    width: number;

    height: number;

    img: string;

    blocked: boolean;

    deleted: boolean;

    deleting: boolean;
  }[];
  slot: {
    top: number
    left: number
  }
}

const defaultState: () => IViewState = () => {
  return {
    data: [],
    slot: {
      top: 0,
      left: 0
    }
  };
};

@injectable()
export class GamePresenter extends Presenter<IViewState> {
  constructor(public slot: CardSlot) {
    super();
    this.state = defaultState();
  }

  allCard: Card[] = [];
  

  setSlot() {
    this.setState(s => {
      s.slot.top = this.slot.top
      s.slot.left = this.slot.left
    })
  }

  initCards() {
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

    function getCard() {
      const c = data.pop();
      return c;
    }

    new Layer(
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

    new Layer(
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

    new Layer(
      [
        [getCard(), getCard(), getCard()],
        [getCard(), 0, getCard()],
        [getCard(), getCard(), getCard()],
      ],
      40,
      60,
      levelZ(3),
    );

    this.allCard = cards;
    this.updateView()
    this.updateBlock();
  }

  /**
   * 初始化3层
   */
  init() {
    this.setSlot()
    this.initCards()
    this.updateView()
  }

  click(id: number) {
    const c = this.allCard.find(v => v.id === id)
    if (c) {
      if (!c.blocked) {
        this.slot.add(c);
        this.slot.remove(c).then(() => {
          this.updateView()
        });
        this.updateView()
      }
    }
  }

  /**
   * 更新遮挡
   */
  updateBlock() {
    this.allCard.forEach((v) => {
      v.blocked = false;
    });

    this.allCard.forEach((a) => {
      this.allCard.forEach((b) => {
        if (a !== b) {
          if (!(a.deleted || b.deleted)) {
            if (a.intersect(b)) {
              if (a.z > b.z) {
                b.blocked = true;
              } else {
                a.blocked = true;
              }
            }
          }
        }
      });
    });

    this.updateView()
  }

  updateView() {
    console.log(this.allCard)
    this.setState((s) => {
      s.data = this.allCard.map((v) => {
        return {
          ...v,
        };
      });
    });
  }
}
