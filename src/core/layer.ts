/**
 * 每一个层级为一个矩形
 * 确定左上 右下坐标
 * 用 矩阵来表示是否放置了卡片
 */

import { Card } from './card';

export class Layer {

  left = 0;

  top = 0;

  z = 0;

  data: (Card | 0)[][] = [[]]; // 0 表示没有卡片

  init(data: (Card | 0)[][], left: number, top: number, z: number) {
    this.left = left;
    this.top = top;
    this.z = z;
    this.data = data;
    this.setCardsPosition();
  }


  /**
   * 对当前层级的卡片设置位置
   */
  setCardsPosition() {
    if (this.data) {
      this.data.forEach((col, j) => {
        col.forEach((v, i) => {
          if (v) {
            v.setRect({
              left: i * Card.CardWidth + this.left,
              top: j * Card.CardHeight + this.top,
            });
            v.z = this.z;
          }
        });
      });
    }
  }
}
