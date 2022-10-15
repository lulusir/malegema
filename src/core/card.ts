export enum ECardType {
  dong,
  xi,
  nan,
  bei,
  bai,
  fa,
  zhong,
}

export const ImagesMap = {
  [ECardType.dong]: '/malegema/assets/z1.gif',
  [ECardType.xi]: '/malegema/assets/z2.gif',
  [ECardType.nan]: '/malegema/assets/z3.gif',
  [ECardType.bei]: '/malegema/assets/z4.gif',
  [ECardType.bai]: '/malegema/assets/z5.gif',
  [ECardType.fa]: '/malegema/assets/z6.gif',
  [ECardType.zhong]: '/malegema/assets/z7.gif',
};

/**
 * 从底部为第一层，每一层zindex为 10， 20， 30
 * @param level
 */
export const levelZ = (level = 1) => {
  return level * 10;
};

export class Card {
  static CardWidth = 20;

  static CardHeight = 28;

  static _id = 0

  constructor(public type: ECardType) {
    this.img = ImagesMap[this.type];
  }

  id = Card._id++

  left = 0;

  top = 0;

  z = 0;

  width = Card.CardWidth;

  height = Card.CardHeight;

  img = '';

  blocked = false;

  deleted = false;

  deleting = false;

  setRect(
    opt: Partial<{
      left: number;
      top: number;
      width: number;
      height: number;
    }>,
  ) {
    this.left = opt.left ?? this.left;
    this.top = opt.top ?? this.top;
    this.width = opt.width ?? this.width;
    this.height = opt.height ?? this.height;
  }

  intersect(b: Card) {
    const a = this;
    return (
      Math.abs(a.left + a.width / 2 - b.left - b.width / 2) <
      (a.width + b.width) / 2 &&
      Math.abs(a.top + a.height / 2 - b.top - b.height / 2) <
      (a.height + b.height) / 2
    );
  }

  /**
   * 设置删除动画
   */
  delete() {
    this.deleting = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.deleting = false;
        this.deleted = true;
        resolve(null)
      }, 300);
    })
  }
}
