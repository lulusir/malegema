import { injectable, Presenter } from '@clean-js/presenter';
import { Card, levelZ } from './card';
import { Layer } from './layer';
import { CardSlot } from './slot.entity';

interface IViewState {
  blocks: number[][] // 0 / 1
}

const defaultState: () => IViewState = () => {
  return {
    blocks: Array(25).fill(1).map(() => {
      return Array(25).fill(0)
    }),
  };
};

@injectable()
export class EditorPresenter extends Presenter<IViewState> {
  constructor() {
    super();
    this.state = defaultState()
  }

  draw(x: number, y: number) {
    this.setState(s => {
      s.blocks[x][y] = s.blocks[x][y] === 0? 1 : 0
    })
  }

  getData() {
    return this.state.blocks
  }
}