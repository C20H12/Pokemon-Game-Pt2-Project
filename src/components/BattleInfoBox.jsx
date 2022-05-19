import React, {useRef} from 'react';

export default function BattleInfoBox(props) {
  const {side, shouldShow, stats} = props;

  const max = useRef(stats.hp);
  
  return(
    <>      
      {
        shouldShow ?
        <div className={side + "Details"}>
          Health: &nbsp;
          <label htmlFor={side + "Hp"}>{stats.hp}</label>
          <progress
            id={side + "Hp"}
            className={stats.hp < 60 ? (stats.hp < 25 ? "bar under25" : "bar under60") : "bar"} 
            value={stats.hp} 
            max={max.current}
          />
          Energy: &nbsp;
          <label htmlFor={side + "Eg"}>{stats.eg}</label>
          <progress 
            id={side + "Eg"} 
            className={stats.eg < 60 ? (stats.eg < 25 ? "bar under25" : "bar under60") : "bar"}
            value={stats.eg} 
            max="100"
          />
        </div>
        :
        null
      }
    </>
  );
}