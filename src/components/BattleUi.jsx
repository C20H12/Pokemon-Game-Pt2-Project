import React, { useState, useReducer, useEffect } from "react";
import {
  BattlePlayer as Player,
  BattleEnemy as Enemy,
} from "./BattlePlayerAndEnemy.jsx";
import { reducerFn } from "../functions/reducer.jsx";
import { getPokemonById, chanceToBoolean } from "../functions/utils.jsx";

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
      def: stats[2].base_stat / 2,
      spAttack: stats[3].base_stat / 2,
      spDef: stats[4].base_stat / 2,
      speed: stats[5].base_stat / 2,
      modalContent: "",
    })),
    enemys: enemyStats.current.map((stats, i) => ({
      id: enemyIds.current[i],
      hp: stats[0].base_stat,
      eg: 100,
      attack: stats[1].base_stat,
      def: stats[2].base_stat / 2,
      spAttack: stats[3].base_stat / 2,
      spDef: stats[4].base_stat / 2,
      speed: stats[5].base_stat / 2,
      modalContent: "",
    })),
  };
  const [statsState, statsDispatch] = useReducer(reducerFn, defaultStats);

  const [selectedTarget, setSelectedTarget] = useState(null);
  const [selectedAttacker, setSelectedAttacker] = useState(null);

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

  const [isAttackAvailable, setIsAttackAvailable] = useState([
    true,
    true,
    true,
  ]);

  const [isEnemyAlive, setIsEnemyAlive] = useState({
    [statsState.enemys[0].id]: true,
    [statsState.enemys[1].id]: true,
    [statsState.enemys[2].id]: true,
  });

  useEffect(() => {
    setIsAttackAvailable(arr => arr.slice().fill(true));
    const currSelectionEg = getPokemonById(statsState, selectedAttacker)?.eg;

    if (currSelectionEg < 15)
      setIsAttackAvailable(arr => arr.slice().fill(false));
    else if (currSelectionEg < 25) setIsAttackAvailable([true, false, false]);
    else if (currSelectionEg < 35) setIsAttackAvailable([true, true, false]);
  }, [selectedAttacker, statsState.players]);

  useEffect(() => {
    const currSelectionHp = getPokemonById(
      statsState,
      selectedTarget,
      true
    )?.hp;

    console.log(currSelectionHp, isEnemyAlive);

    if (currSelectionHp <= 0) setIsEnemyAlive(obj => ({...obj, [selectedTarget]: false}));
  }, [selectedTarget, statsState.enemys]);

  useEffect(() => {
    setTimeout(() => {
      statsDispatch({type: "CLOSE_MODAL"})
    }, 3000);
  }, statsState.players.map(p => p.eg))

  const handleAttack = e => {
    const dodge = getPokemonById(statsState, selectedTarget, true).speed;

    const dispObj = {
      type: chanceToBoolean(dodge) ? "MISSED" : "ATTACK",
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
          isSelectedAsTargetArr.includes(true) &&
          isEnemyAlive[selectedTarget] ? (
            <div className="controls">
              {Array(3)
                .fill(null)
                .map((_, i) => {
                  return (
                    <React.Fragment key={i}>
                      {isAttackAvailable[i] ? (
                        <button
                          data-attack={i + 1}
                          onClick={handleAttack}
                          data-tip-text={(() => {
                            const attk = getPokemonById(statsState, selectedAttacker).attack
                            if (i === 0){
                              return `Damage: ${~~(attk * 0.05)} - ${~~(attk * 0.1)} HP\n Costs: 7 - 15 EG`;
                            }
                            else if (i === 1){
                              return `Damage: ${~~(attk * 0.1)} - ${~~(attk * 0.2)} HP\n Costs: 16 - 25 EG`;
                            }
                            else if (i === 2){
                              return `Damage: ${~~(attk * 0.2)} - ${~~(attk * 0.3)} HP\n Costs: 26 - 35 EG`;
                            }
                          })()}
                        >
                          Attack {i + 1}
                        </button>
                      ) : (
                        <button
                          key={i}
                          disabled
                          data-tip-text="Not enough energy to use this move!"
                        >
                          Attack {i + 1}
                        </button>
                      )}
                    </React.Fragment>
                  );
                })}
            </div>
          ) : (
            <div className="controls">
              {Array(3)
                .fill(null)
                .map((_, i) => {
                  return (
                    <button
                      key={i}
                      disabled
                      data-tip-text={
                        isEnemyAlive[selectedTarget] === false
                          ? "The selected enemy has been killed!"
                          : "Need to select a target and an attacker!"
                      }
                    >
                      Attack {i + 1}
                    </button>
                  );
                })}
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
                isAlive={isEnemyAlive[enemyIds.current[i]]}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

