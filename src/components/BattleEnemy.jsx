import React, {useState} from 'react';

function BattleEnemy(props) {
  const {id} = props;

  const [shouldShowDetails, setShouldShowDetails] = useState(false);
  
  return (
    <div 
      className="enemy" 
      onMouseEnter={() => setShouldShowDetails(bool => bool = !bool)} 
      onMouseLeave={() => setShouldShowDetails(bool => bool = !bool)}
    >
      <img 
        src={
`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        } 
        alt="err" 
      />
      {
        shouldShowDetails ?
        <div className="enemyDetails">
          Health: &nbsp;
          <label for="enemyHp">22</label>
          <progress id="enemyHp" className="bar " value="66" max="100"/>
          Energy: &nbsp;
          <label for="enemyEg">22</label>
          <progress id="enemyEg" className="bar under25" value="22" max="100" />
        </div>
        :
        null
      }
    </div>
  );
}
export default BattleEnemy;