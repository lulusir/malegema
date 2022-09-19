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
const levelZ = (level = 1) => {
  return level * 10;
};

export const CardWidth = 20;
export const CardHeight = 28;

export class Card {
  constructor(public type: ECardType) {
    this.img = ImagesMap[this.type];
  }

  x = 0;
  y = 0;
  z = levelZ(1);
  img = '';
  isBlocked = false;
  width = CardWidth;
  height = CardHeight;
}

/**
 * 每一个层级为一个矩形
 * 确定左上 右下坐标
 * 用 矩阵来表示是否放置了卡片
 */

export class Layer {
  constructor(data?: (Card | 0)[][], topLeft?: number[]) {
    if (data) {
      data.forEach((col, j) => {
        col.forEach((v, i) => {
          if (v) {
            console.log(v, i * CardWidth);
            v.x = i * CardWidth;
            v.y = j * CardHeight;
          }
        });
      });
      this.data = data;
    }
    if (topLeft) {
      this.topLeft = topLeft;
    }
  }

  topLeft = [0, 0];

  bottomRight = [
    this.topLeft[0] + 5 * CardWidth,
    this.topLeft[1] + 5 * CardHeight,
  ];

  data: (Card | 0)[][] = [[]]; // 0 表示没有卡片
}
