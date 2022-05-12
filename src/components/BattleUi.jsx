import React from 'react';
import Player from "./BattlePlayer.jsx";
import Enemy from "./BattleEnemy.jsx"


export default function BattleUi(props) {

  const {playerIds, enemyIds} = props;
  
  return(
    <>
      <h1 className="battleTitle">Battle Started!</h1>
      <div className="battleUiWindow">
        <div className="playerWrap">
          {
            playerIds.current.map((id, i) => <Player id={id} key={i} />)
          }
          <div className="controls">
            <button>Attack 1</button>
            <button>Attack 2</button>
            <button>Attack 3</button>
          </div>
        </div>
        <div className="enemyWrap">
          { 
            enemyIds.current.map((id, i) => <Enemy id={id} key={i} />)
          }
        </div>
      </div>
    </>
  );
}
