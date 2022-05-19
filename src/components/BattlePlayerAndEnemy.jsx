import React, { useState } from "react";
import BattleInfoBox from "./BattleInfoBox.jsx"

export function BattlePlayer(props){
  const {id, stats, statsDispatchFn} = props;

  const [shouldShowInfo, setShouldShowInfo] = useState(false);

  const handleShowInfo = () => {
    setShouldShowInfo(bool => bool = !bool);
  }
  
  return(
    <div 
      className="player"
      onMouseEnter={handleShowInfo} 
      onMouseLeave={handleShowInfo}
    >
      <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
        alt="err" 
      />
      <BattleInfoBox 
        side="player" 
        shouldShow={shouldShowInfo} 
        stats={stats} 
        id={id} 
      />
    </div>
  );
}

export function BattleEnemy(props){
  const {id, stats, statsDispatchFn} = props;
  
  const [shouldShowInfo, setShouldShowInfo] = useState(false);

  const handleShowInfo = () => {
    setShouldShowInfo(bool => bool = !bool);
  }
  
  return(
    <div 
      className="enemy"
      onMouseEnter={handleShowInfo} 
      onMouseLeave={handleShowInfo}
    >
      <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
        alt="err" 
      />
      <BattleInfoBox 
        side="enemy" 
        shouldShow={shouldShowInfo} 
        stats={stats} 
        id={id} 
      />
    </div>
  )
}

