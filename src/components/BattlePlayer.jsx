import React from "react"

export default function BattlePlayer(props){

  const {id} = props;
  
  return(
    <div>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="err" />
    </div>
  );
}
