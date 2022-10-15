import { GamePresenter } from '@/core/game.presenter';
import { usePresenter } from '@clean-js/react-presenter';
import { useEffect } from 'react';
import './index.less';
import 'animate.css';
import { EditorPresenter } from '@/core/eidotr.presenter';

export default function HomePage() {
  const { p, s } = usePresenter(GamePresenter);
  const { p: editorP } = usePresenter(EditorPresenter);
  useEffect(() => {
    p.init();
  }, []);

  return (
    <div className="page">
      <div className='editor'>
        <b>地图编辑区</b>

        {editorP.state.blocks.map((u, x) => {
          return <div className='editor-row'>{
            u.map((v, y) => {
              return <div onClick={() => {
                editorP.draw(x, y)
              }} className={`editor-block ${v ? 'selected' : ''}`}></div>;
            })
          }</div>;
        })}
        <div>
          <button onClick={() => {
            const data = editorP.getData()
            p.saveToLocal(data)
            p.init(data)
          }}>保存</button>
          <button onClick={() => {
            const data = editorP.getData()
            p.removeCache()
            p.init()
          }}>清除缓存</button>
        </div>
      </div>

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
              key={u.id}
              onClick={() => {
                p.click(u.id);
              }}
              className={`card ${u.blocked ? 'isBlocked' : ''} ${u.deleting ? 'animate__animated animate__fadeOut' : ''
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


      </div>

      <div className="actions" style={{}}>
        <button
          type="button"
          className="btn1"
          onClick={() => {
            p.init();
          }}
        >
          重来一局
        </button>
      </div>
    </div>
  );
}
