import React from 'react';

function BattleEnemy(props) {
  const {id} = props;
  
  return (
    <div>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="err" />
    </div>
  );
}
export default BattleEnemy;