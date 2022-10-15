import { injectable, Presenter } from '@clean-js/presenter';
import { Card, levelZ } from './card';
import { Layer } from './layer';
import { CardSlot } from './slot.entity';

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

const mockBlocks: number[][] = [[1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0], [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0], [0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
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
  constructor(public slot: CardSlot, public layer: Layer) {
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

  initCards(blocks = mockBlocks) {
    const levels = 3 // 需要是3的倍数

    let n = 0
    blocks.forEach(u => {
      u.forEach(v => {
        if (v === 1) {
          n += 1
        }
      })
    })
    let nums = n * levels



    const cards: Card[] = [];

    for (let i = 0; i < nums; i += 3) {
      cards.push(new Card(i % 7));
      cards.push(new Card(i % 7));
      cards.push(new Card(i % 7));
    }

    const data = this.shuffle(cards);

    function getCard() {
      const c = data.pop();
      return c;
    }

    for (let i = 0; i < levels; i++) {
      this.layer.init(
        blocks.map(v => {
          return v.map(u => {
            return u === 1 ? getCard() : 0;
          })
        }),
        i * 4,
        i * 6,
        levelZ(i + 1),
      );
    }
    this.allCard = cards;
  }

  shuffle(input: any[]) {
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
   * 初始化3层
   */
  init(blocks = mockBlocks) {
    const data = localStorage.getItem('blocks');
    if (data) {
      blocks = JSON.parse(data) as unknown as number[][]
    }

    this.slot.init()
    this.setSlot()
    this.initCards(blocks)
    this.updateBlock();
    this.updateView()
  }

  saveToLocal(blocks = mockBlocks) {
    localStorage.setItem('blocks', JSON.stringify(blocks));
  }

  removeCache() {
    localStorage.removeItem('blocks',);
  }

  loadByLocal() {
    const data = localStorage.getItem('blocks');
    if (data) {
      this.init(JSON.parse(data))
    }
  }

  click(id: number) {
    const c = this.allCard.find(v => v.id === id)
    if (c) {
      if (!c.blocked) {
        const canContinue = this.slot.add(c);
        if (!canContinue) {
          alert('游戏结束咧')
        } else {
          this.slot.remove(c).then(() => {
            this.updateBlock()
            this.updateView()
          });
          this.updateBlock()
          this.updateView()
        }
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

  }

  updateView() {
    this.setState((s) => {
      s.data = this.allCard.map((v) => {
        return {
          ...v,
        };
      });
    });
  }
}
