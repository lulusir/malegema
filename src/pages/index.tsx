import { GamePresenter } from '@/core/game.presenter';
import yayJpg from '../assets/yay.jpg';
import './index.less';

const p = new GamePresenter();
p.init();
export default function HomePage() {
  return (
    <div>
      <div className="playground">
        {p.state.data.map((v) => {
          return v.data?.map((w) => {
            return w?.map((u) => {
              if (u === 0) {
                return <div className="empty-card" />;
              }
              if (!u) {
                return null;
              }
              console.log(!!u.img);
              return (
                <img
                  className="card"
                  src={u.img}
                  style={{
                    left: u.x,
                    top: u.y,
                    zIndex: u.z,
                    width: u.width + 'px',
                    height: u.height + 'px',
                  }}
                ></img>
              );
            });
          });
        })}
      </div>
    </div>
  );
}
