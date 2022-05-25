import React, { useState, useReducer } from "react";
import {
  BattlePlayer as Player,
  BattleEnemy as Enemy,
} from "./BattlePlayerAndEnemy.jsx";
import { reducerFn } from "./reducer.jsx";

/**
 * The component for the main battle window
 * @param {Object} props - values passed from app
 * @param {React.MutableRefObject<number[]>} props.playerIds - array of the 3 selected player's id
 * @param {React.MutableRefObject<number[]>} props.enemyIds - array of the 3 selected enemies' id
 * @param {React.MutableRefObject<Array[]>} props.playerStats - array of 3 arrays each containing a player's raw stats
 * @param {React.MutableRefObject<Array[]>} props.enemyStats - array of 3 arrays each containing an enemy's raw stats
 * @returns {JSX.Element} - the window enclosing the player/enemy images and the attack controls
 */
export default function BattleUi(props) {
  const { playerIds, enemyIds, playerStats, enemyStats } = props;

  const defaultStats = {
    players: playerStats.current.map((stats, i) => ({
      id: playerIds.current[i],
      hp: stats[0].base_stat,
      eg: 100,
      attack: stats[1].base_stat,
      def: stats[2].base_stat,
      spAttack: stats[3].base_stat,
      spDef: stats[4].base_stat,
      speed: stats[5].base_stat,
    })),
    enemys: enemyStats.current.map((stats, i) => ({
      id: enemyIds.current[i],
      hp: stats[0].base_stat,
      eg: 100,
      attack: stats[1].base_stat,
      def: stats[2].base_stat,
      spAttack: stats[3].base_stat,
      spDef: stats[4].base_stat,
      speed: stats[5].base_stat,
    })),
  };
  const [statsState, statsDispatch] = useReducer(reducerFn, defaultStats);

  const [selectedTarget, setSelectedTarget] = useState(0);
  const [selectedAttacker, setSelectedAttacker] = useState(0);

  const [isSelectedAsTargetArr, setIsSelectedAsTargetArr] = useState([
    false,
    false,
    false,
  ]);
  const [isSelectedAsAttackerArr, setIsSelectedAsAttackerArr] = useState([
    false,
    false,
    false,
  ]);

  const handleAttack = (e) => {
    const dispObj = {
      type: "ATTACK",
      payload: {
        attackType: parseInt(e.target.dataset.attack, 10),
        targetId: selectedTarget,
        attackerId: selectedAttacker,
      },
    };
    statsDispatch(dispObj);
  };

  return (
    <>
      <h1 className="battleTitle">Battle Started!</h1>
      <div className="battleUiWindow">
        <div className="playerWrap">
          {statsState.players.map((player, i) => {
            return (
              <Player
                id={playerIds.current[i]}
                key={i}
                stats={player}
                setAttacker={setSelectedAttacker}
                idx={i}
                isSelected={isSelectedAsAttackerArr[i]}
                setIsSelected={setIsSelectedAsAttackerArr}
              />
            );
          })}

          {isSelectedAsAttackerArr.includes(true) &&
          isSelectedAsTargetArr.includes(true) ? (
            <div className="controls">
              <button data-attack="1" onClick={handleAttack}>Attack 1</button>
              <button data-attack="2" onClick={handleAttack}>Attack 2</button>
              <button data-attack="3" onClick={handleAttack}>Attack 3</button>
            </div>
          ) : (
            <div className="controls">
              <button disabled>Attack 1</button>
              <button disabled>Attack 2</button>
              <button disabled>Attack 3</button>
            </div>
          )}
        </div>
        <div className="enemyWrap">
          {statsState.enemys.map((enem, i) => {
            return (
              <Enemy
                id={enemyIds.current[i]}
                key={i}
                stats={enem}
                setTarget={setSelectedTarget}
                idx={i}
                isSelected={isSelectedAsTargetArr[i]}
                setIsSelected={setIsSelectedAsTargetArr}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
