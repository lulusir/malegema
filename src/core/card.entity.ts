import imgF1 from '@/assets/z1.gif';
import imgF2 from '@/assets/z2.gif';
import imgF3 from '@/assets/z3.gif';
import imgF4 from '@/assets/z4.gif';
import imgF5 from '@/assets/z5.gif';
import imgF6 from '@/assets/z6.gif';
import imgF7 from '@/assets/z7.gif';

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
  [ECardType.dong]: imgF1,
  [ECardType.xi]: imgF2,
  [ECardType.nan]: imgF3,
  [ECardType.bei]: imgF4,
  [ECardType.bai]: imgF5,
  [ECardType.fa]: imgF6,
  [ECardType.zhong]: imgF7,
};

/**
 * 从底部为第一层，每一层zindex为 10， 20， 30
 * @param level
 */
export const levelZ = (level = 1) => {
  return level * 10;
};

export const CardWidth = 40;
export const CardHeight = 56;

export class Card {

  constructor(public type: ECardType) {
    this.img = ImagesMap[this.type];
  }

  left = 0;
  top = 0;
  right = this.left + CardWidth;
  bottom = this.top + CardHeight;
  width = CardWidth;
  height = CardHeight;
  z = 0;
  img = '';
  isBlocked = false;
  deleted = true;

  setRect(
    opt: Partial<{
      left: number;
      top: number;
    }>,
  ) {
    this.left = opt.left ?? this.left;
    this.top = opt.top ?? this.top;
    this.right = this.left + CardWidth;
    this.bottom = this.top + CardHeight;
  }

  intersect(b: Card) {
    const a = this
    return Math.abs(a.left + a.width / 2 - b.left - b.width / 2) < (a.width + b.width) / 2 &&
      Math.abs(a.top + a.height / 2 - b.top - b.height / 2) < (a.height + b.height) / 2
  }
}

/**
 * 每一个层级为一个矩形
 * 确定左上 右下坐标
 * 用 矩阵来表示是否放置了卡片
 */

export class Layer {
  constructor(data: (Card | 0)[][], left: number, top: number, z: number) {
    this.left = left;
    this.top = top;
    this.right = this.left + 5 * CardWidth;
    this.bottom = this.top + 5 * CardHeight;

    if (data) {
      data.forEach((col, j) => {
        col.forEach((v, i) => {
          if (v) {
            v.setRect({
              left: i * CardWidth + this.left,
              top: j * CardHeight + this.top,
            });
            v.z = z;
          }
        });
      });
      this.data = data;
    }
  }

  // topLeft = [0, 0];
  left = 0;
  top = 0;
  right = this.left + 5 * CardWidth;
  bottom = this.top + 5 * CardHeight;

  data: (Card | 0)[][] = [[]]; // 0 表示没有卡片
}

export class CardSlot {
  left = 0;
  top = 400;

  data: Card[] = [];

  add(card: Card) {
    if (this.data.length < 7) {
      card.setRect({
        left: this.left + CardWidth * this.data.length,
        top: this.top,
      });
      this.data.push(card);
    } else {
      // 通知游戏结束
      alert('游戏结束咧')
    }
  }

  refresh() {
    this.data.forEach((v, i) => {
      v.setRect({
        left: this.left + CardWidth * i,
        top: this.top,
      });
    })
  }

  remove(card: Card) {
    let count = 0;
    this.data.forEach((v) => {
      if (v.type === card.type) {
        count += 1;
      }
    });
    let success = count === 3;

    if (success) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.data = this.data.filter((v) => {
            if (v.type === card.type) {
              v.deleted = true;
              return false;
            }
            return true;
          });
          resolve(null)
        }, 400);
      })
    }
    return Promise.resolve(null)
  }
}
