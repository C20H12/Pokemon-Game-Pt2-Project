import React from 'react';
import Player from "./BattlePlayer.jsx";
import Enemy from "./BattleEnemy.jsx"


function Battle(props) {
  return(
    <>
      <h1>START</h1>
      <Player />
      <Enemy />
    </>
  );
}
export default Battle;