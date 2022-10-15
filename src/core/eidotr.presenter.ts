import { injectable, Presenter } from '@clean-js/presenter';
import { Card, levelZ } from './card';
import { Layer } from './layer';
import { CardSlot } from './slot.entity';

interface IViewState {
  blocks: boolean[][]
}

const defaultState: () => IViewState = () => {
  return {
    blocks: Array(25).fill(Array(25).fill(false)),
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
      s.blocks[x][y] = !s.blocks[x][y]
    })
  }

  getData() {
    return this.state.blocks.map(v => v.map(u => u ? 1 : 0))
  }
}