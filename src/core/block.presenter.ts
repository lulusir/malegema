import { Presenter, injectable } from '@clean-js/presenter';
import { EBlockType } from './block.entity';

/**
 * 每个盒子模块
 */

interface IViewState {
  data: 
}

const defaultState: () => IViewState = () => {
  return {
  };
};

@injectable()
export class BlockPresenter extends Presenter<IViewState> {
  constructor() {
    super();
    this.state = defaultState();
  }

  showLoading() {
    this.setState((s) => {
      s.loading = true;
    });
  }

  hideLoading() {
    this.setState((s) => {
      s.loading = false;
    });
  }
}
