import { Card } from './card';

export class CardSlot {
  left = 180;

  top = 700;

  data: Card[] = [];

  init() {
    this.data = []
  }

  add(card: Card) {
    if (this.data.length < 7) {
      card.setRect({
        left: this.left + Card.CardWidth * this.data.length,
        top: this.top,
      });
      this.data.push(card);
      return true;
    } else {
      // 通知游戏结束
      return false;
    }
  }

  refresh() {
    this.data.forEach((v, i) => {
      v.setRect({
        left: this.left + Card.CardWidth * i,
        top: this.top,
      });
    });
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
      const p = Promise.all(this.data.filter(v => v.type === card.type).map(v => v.delete()))
      this.data = this.data.filter((v) => v.type !== card.type);
      this.refresh();
      return p
    }

    return Promise.resolve()
  }
}
