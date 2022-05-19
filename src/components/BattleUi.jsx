import React, { useReducer } from 'react';
import {BattlePlayer as Player, BattleEnemy as Enemy} from "./BattlePlayerAndEnemy.jsx";
import {reducerFn} from './reducer.jsx'

export default function BattleUi(props) {

  const { playerIds, enemyIds, playerStats, enemyStats } = props;

  const defaultStats = {
    players: playerStats.current.map((stats, i) => (
      {
        id: playerIds.current[i],
        hp: stats[0].base_stat,
        eg: 100,
        attack: stats[1].base_stat,
        def: stats[2].base_stat,
        spAttack: stats[3].base_stat,
        spDef: stats[4].base_stat,
        speed: stats[5].base_stat,
      }
    )),
    enemys: enemyStats.current.map((stats, i) => (
      {
        id: enemyIds.current[i],
        hp: stats[0].base_stat,
        eg: 100,
        attack: stats[1].base_stat,
        def: stats[2].base_stat,
        spAttack: stats[3].base_stat,
        spDef: stats[4].base_stat,
        speed: stats[5].base_stat,
      }
    ))
  };
  const [statsState, statsDispatch] = useReducer(reducerFn, defaultStats);
  

  return (
    <>
      <h1 className="battleTitle">Battle Started!</h1>
      <div className="battleUiWindow">
        <div className="playerWrap">
          {
            statsState.players.map((player, i) => {
              return (
                <Player
                  id={playerIds.current[i]}
                  key={i}
                  stats={player}
                  statsDispatchFn={statsDispatch}
                />
              )
            })
          }
          <div className="controls">
            <button onClick={() => statsDispatch({type: "ATTACK", payload: {id: enemyIds.current[1], amount: 5}})}>Attack 1</button>
            <button>Attack 2</button>
            <button>Attack 3</button>
          </div>
        </div>
        <div className="enemyWrap">
          {
            statsState.enemys.map((enem, i) => {
              return (
                <Enemy
                  id={enemyIds.current[i]}
                  key={i}
                  stats={enem}
                  statsDispatchFn={statsDispatch}
                />
              )
            })
          }
        </div>
      </div>
    </>
  );
}
