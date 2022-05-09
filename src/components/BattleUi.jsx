import React from 'react';
import Player from "./BattlePlayer.jsx";
import Enemy from "./BattleEnemy.jsx"


function Battle(props) {
  return(
    <>
      <h1 className="battleTitle">Battle Started!</h1>
      <div className="battleUiWindow">
        <Player />
        <Enemy />
      </div>
    </>
  );
}
export default Battle;