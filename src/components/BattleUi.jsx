import React from 'react';
import Player from "./BattlePlayer.jsx";
import Enemy from "./BattleEnemy.jsx"


export default function BattleUi(props) {

  const {playerIds, enemyIds} = props;
  
  return(
    <>
      <h1 className="battleTitle">Battle Started!</h1>
      <div className="battleUiWindow">
        {
          playerIds.current.map((id, i) => <Player id={id} key={i} />)
        }
        { 
          enemyIds.current.map((id, i) => <Enemy id={id} key={i} />)
        }
      </div>
    </>
  );
}
