import { GamePresenter } from '@/core/game.presenter';
import { usePresenter } from '@clean-js/react-presenter';
import { useEffect } from 'react';
import './index.less';
import 'animate.css';

export default function HomePage() {
  const { p, s } = usePresenter(GamePresenter);

  useEffect(() => {
    p.init();
  }, []);

  return (
    <div className="page">
      <div className="playground">
        {s.data.map((u) => {
          if (!u) {
            return null;
          }
          if (u.deleted) {
            return null;
          }
          return (
            <img
              onClick={() => {
                p.click(u.id);
              }}
              className={`card ${u.blocked ? 'isBlocked' : ''} ${
                u.deleting ? 'animate__animated animate__fadeOut' : ''
              }`}
              src={u.img}
              style={{
                left: u.left,
                top: u.top,
                zIndex: u.z,
                width: u.width + 'px',
                height: u.height + 'px',
              }}
            ></img>
          );
        })}

        <div
          className="slot"
          style={{
            left: p.state.slot.left,
            top: p.state.slot.top,
          }}
        ></div>

        <button
          type="button"
          className="btn1"
          onClick={() => {
            p.init();
          }}
        >
          重来
        </button>
      </div>
    </div>
  );
}
