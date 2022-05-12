import React, { useState } from "react"

export default function BattlePlayer(props){
  const {id} = props;

  const [shouldShowDetails, setShouldShowDetails] = useState(false)

  const handelShowDetails = () => {
    setShouldShowDetails(bool => bool = !bool);
  }
  
  return(
    <div 
      className="player" 
      onMouseEnter={handelShowDetails} 
      onMouseLeave={handelShowDetails}
    >
      <img 
        src={
`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        } 
        alt="err" 
      />
      
      {
        shouldShowDetails ?
        <div className="playerDetails">
          Health: &nbsp;
          <label for="playerHp">22</label>
          <progress id="playerHp" className="bar " value="66" max="100"></progress>
          Energy: &nbsp;
          <label for="playerEg">22</label>
          <progress id="playerEg" className="bar under25" value="22" max="100"></progress>
        </div>
        :
        null
      }
    </div>
  );
}
