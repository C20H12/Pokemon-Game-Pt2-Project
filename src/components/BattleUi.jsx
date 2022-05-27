import React, { useState, useReducer, useEffect } from "react";
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

    if (currSelectionHp <= 0) isEnemyAlive[selectedTarget] = false;
  }, [selectedTarget, statsState.enemys]);

  const handleAttack = e => {
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
          isSelectedAsTargetArr.includes(true) &&
          isEnemyAlive[selectedTarget] ? (
            <div className="controls">
              {Array(3)
                .fill(null)
                .map((_, i) => {
                  return (
                    <>
                      {isAttackAvailable[i] ? (
                        <button
                          key={i}
                          data-attack={i + 1}
                          onClick={handleAttack}
                          data-tip-text={`Will deal: ${ // TODO: add calculations to display the attack pts
                            getPokemonById(statsState, selectedAttacker).attack * 0.5
                          } points\nWill cost: ${
                            getPokemonById(statsState, selectedAttacker).attack
                          }`}
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
                    </>
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
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function getPokemonById(statsObj, id, isEnemy = false) {
  if (isEnemy) return statsObj.enemys.filter(enem => enem.id === id)[0];
  return statsObj.players.filter(player => player.id === id)[0];
}
