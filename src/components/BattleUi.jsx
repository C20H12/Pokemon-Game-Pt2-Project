import React, { useState, useReducer } from "react";
import {
  BattlePlayer as Player,
  BattleEnemy as Enemy,
} from "./BattlePlayerAndEnemy.jsx";
import { reducerFn } from "./reducer.jsx";

/**
 * Function that gets a random integer between 2 numbers, inclusive
 * @param {number} min - the minimum in the number range
 * @param {number} max - the maximum in the number range
 * @returns {number} - a random integer number
 */
function randint(min, max) {
  return Math.floor(
    Math.random() * (Math.ceil(max) - Math.floor(min) + 1) + Math.ceil(min)
  );
}

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

  const handleAttack1 = () => {
    const attack = defaultStats.players[0].attack;
    const dispObj = {
      type: "ATTACK",
      payload: {
        id: selectedTarget,
        amount: randint(attack * 0.05, attack * 0.1),
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
                setTarget={setSelectedTarget}
              />
            );
          })}
          <div className="controls">
            <button onClick={handleAttack1}>Attack 1</button>
            <button>Attack 2</button>
            <button>Attack 3</button>
          </div>
        </div>
        <div className="enemyWrap">
          {statsState.enemys.map((enem, i) => {
            return (
              <Enemy
                id={enemyIds.current[i]}
                key={i}
                stats={enem}
                setTarget={setSelectedTarget}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
