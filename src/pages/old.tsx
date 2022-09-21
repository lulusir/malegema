import { CardHeight, CardWidth } from '@/core1/card.entity';
import { GamePresenter } from '@/core1/game.presenter';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import './index.less';

export default function HomePage() {
  const [, forceUpdate] = useState({});

  const p = useRef(new GamePresenter()).current;

  useEffect(() => {
    p.forceUpdate = () => {
      forceUpdate({});
      // console.log(p.state.allCard.map((v) => v.isBlocked));
    };
    p.init();
  }, []);

  return (
    <div className='page'>
      <div className="playground">
        {p.state.layer.map((v) => {
          return v.data?.map((w) => {
            return w?.map((u) => {
              if (u === 0) {
                return <div className="empty-card"></div>;
              }
              if (!u) {
                return null;
              }
              if (u.deleted) {
                return null;
              }
              return (
                <img
                  onClick={() => {
                    p.click(u);
                  }}
                  className={`card ${u.isBlocked ? 'isBlocked' : ''}`}
                  src={u.img}
                  style={{
                    left: u.left,
                    top: u.top,
                    zIndex: u.z,
                    width: CardWidth + 'px',
                    height: CardHeight + 'px',
                  }}
                ></img>
              );
            });
          });
        })}
        <div
          className="slot"
          style={{
            left: p.state.cardSlot.left,
            top: p.state.cardSlot.top,
          }}
        ></div>

        <button type='button' className='btn' onClick={() => {
          p.autoRemove()
        }}>自动碰</button>

<button type='button' className='btn1' onClick={() => {
          p.init()
        }}>重来</button>
      </div>
    </div>
  );
}
