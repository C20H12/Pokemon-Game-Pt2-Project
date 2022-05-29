import React, { useState, useReducer, useEffect } from "react";
import {
  BattlePlayer as Player,
  BattleEnemy as Enemy,
} from "./BattlePlayerAndEnemy.jsx";
import { reducerFn } from "../functions/reducer.jsx";
import {
  getPokemonById,
  chanceToBoolean,
  randint,
  delaySeconds,
} from "../functions/utils.jsx";

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

  const [isPlayerActedThisTurn, setIsPlayerActedThisTurn] = useState({
    [statsState.players[0].id]: false,
    [statsState.players[1].id]: false,
    [statsState.players[2].id]: false,
  });

  const [isPlayerAlive, setIsPlayerAlive] = useState({
    [statsState.players[0].id]: true,
    [statsState.players[1].id]: true,
    [statsState.players[2].id]: true,
  });

  const [battleState, setBattleState] = useState("ongoing");

  const [shouldShowHelp, setShouldShowHelp] = useState(false);

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

    if (currSelectionHp <= 0)
      setIsEnemyAlive(obj => ({ ...obj, [selectedTarget]: false }));
  }, [selectedTarget, statsState.enemys]);

  useEffect(
    () => {
      statsState.players.forEach(player => {
        if (player.hp <= 0)
          setIsPlayerAlive(obj => ({ ...obj, [player.id]: false }));
      });
    },
    statsState.players.map(p => p.hp)
  );

  useEffect(() => {
    setTimeout(() => {
      statsDispatch({ type: "CLOSE_MODAL" });
    }, 1000);
  }, [
    ...statsState.players.map(p => p.eg),
    ...statsState.enemys.map(e => e.eg),
  ]);

  useEffect(() => {
    if (!Object.values(isEnemyAlive).includes(true)) setBattleState("win");
    if (!Object.values(isPlayerAlive).includes(true)) setBattleState("lose");
  }, [isEnemyAlive, isPlayerAlive]);

  /**
   * Function that handles the attack and updates the statsState
   * @param {number} attackType - the type of attack, 1 - 3
   * @param {number} attackTarget - the target's id
   * @param {number} attackAttacker - the attacker's id
   * @param {boolean} isEnemyAttacking - is the attack done by the enemy?
   */
  const handleAttack = (
    attackType,
    attackTarget,
    attackAttacker,
    isEnemyAttacking = false
  ) => {
    const target = getPokemonById(statsState, attackTarget, !isEnemyAttacking);
    const tDodge = target.speed;
    const tDef = target.def;
    const tSPAttack = target.spAttack;
    const tSPDef = target.spDef;

    let type;
    if (chanceToBoolean(tDodge)) type = "MISSED";
    else if (chanceToBoolean(tDef)) type = "DEFENDED";
    else if (chanceToBoolean(tSPAttack)) type = "ATTACK_SP";
    else if (chanceToBoolean(tSPDef)) type = "DEFENDED_SP";
    else type = "ATTACK";

    const dispObj = {
      type,
      payload: {
        attackType,
        targetId: attackTarget,
        attackerId: attackAttacker,
        isEnemyAttacking,
      },
    };
    statsDispatch(dispObj);

    if (!isEnemyAttacking)
      setIsPlayerActedThisTurn(obj => ({ ...obj, [selectedAttacker]: true }));
  };

  const handleEndTurn = async () => {
    setIsPlayerActedThisTurn(obj => {
      const newObj = { ...obj };
      Object.keys(obj).forEach(objKey => {
        if (!obj[objKey]) {
          statsDispatch({
            type: "REFILL",
            payload: { attackerId: objKey, isEnemyAttacking: false },
          });
        }
        newObj[objKey] = false;
      });
      return newObj;
    });

    for (let i = 0; i < 3; i++) {
      const currEnemy = statsState.enemys[i];
      if (!isEnemyAlive[currEnemy.id]) continue;

      const alivePlayers = statsState.players.filter(player => player.hp > 0);

      let maxUsebleAttack = 3;
      if (currEnemy.eg < 35) maxUsebleAttack = 2;
      if (currEnemy.eg < 25) maxUsebleAttack = 1;
      if (currEnemy.eg < 15) {
        statsDispatch({
          type: "REFILL",
          payload: { attackerId: currEnemy.id, isEnemyAttacking: true },
        });
        continue;
      }

      handleAttack(
        randint(1, maxUsebleAttack),
        alivePlayers[randint(0, alivePlayers.length - 1)].id,
        statsState.enemys[i].id,
        true
      );
      await delaySeconds(2);
    }
  };

  if (battleState === "win") {
    return <div>you win</div>;
  } else if (battleState === "lose") {
    return <div>you lost</div>;
  }

  return (
    <>
      <h1 className="battleTitle">Battle Started!</h1>
      <div
        className="battleQuestion"
        onMouseEnter={() => setShouldShowHelp(true)}
        onMouseLeave={() => setShouldShowHelp(false)}
      >
        ?
      </div>
      {shouldShowHelp ? <div className="battleHelpMsgBox">
        <ul>
          <li><b>Selecting:</b> a member on both the player and enemy sides must be selected to proceed</li>
          <li><b>Attacking:</b> use the Attack 1-3 buttons, each represents 'weak', 'medium', 'strong' respectively</li>
          <li><b>Turns:</b> each member can only act once per turn</li>
          <li><b>End turn:</b> will trigger the enemy's moves, members that did not act this turn will get an refill of EG</li>
          <li><b>Winning/losing:</b> if all of the members on a side has died, the game will end</li>
        </ul>
      </div> : null}
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
                isAlive={isPlayerAlive[playerIds.current[i]]}
              />
            );
          })}

          {isSelectedAsAttackerArr.includes(true) &&
          isSelectedAsTargetArr.includes(true) &&
          isEnemyAlive[selectedTarget] &&
          isPlayerAlive[selectedAttacker] &&
          !isPlayerActedThisTurn[selectedAttacker] ? (
            <div className="controls">
              {Array(3)
                .fill(null)
                .map((_, i) => {
                  return (
                    <React.Fragment key={i}>
                      {isAttackAvailable[i] ? (
                        <button
                          data-attack={i + 1}
                          onClick={evnt =>
                            handleAttack(
                              parseInt(evnt.target.dataset.attack, 10),
                              selectedTarget,
                              selectedAttacker
                            )
                          }
                          data-tip-text={(() => {
                            const attk = getPokemonById(
                              statsState,
                              selectedAttacker
                            ).attack;
                            if (i === 0) {
                              return `Damage: ${~~(attk * 0.05)} - ${~~(
                                attk * 0.1
                              )} HP\n Costs: 7 - 15 EG`;
                            } else if (i === 1) {
                              return `Damage: ${~~(attk * 0.1)} - ${~~(
                                attk * 0.2
                              )} HP\n Costs: 16 - 25 EG`;
                            } else if (i === 2) {
                              return `Damage: ${~~(attk * 0.2)} - ${~~(
                                attk * 0.3
                              )} HP\n Costs: 26 - 35 EG`;
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
                      data-tip-text={(() => {
                        if (isEnemyAlive[selectedTarget] === false)
                          return "The selected enemy has been killed!";
                        else if (isPlayerActedThisTurn[selectedAttacker])
                          return "Already acted this turn!";
                        else if (isPlayerAlive[selectedAttacker] === false)
                          return "This member has died!";
                        else return "Need to select a target and an attacker!";
                      })()}
                    >
                      Attack {i + 1}
                    </button>
                  );
                })}
            </div>
          )}
        </div>
        <div className="enemyWrap">
          <div className="controls">
            <button
              id="endTurn"
              data-tip-text={`End the current turn: \nPokemons that did not\n attack will gain 10 EG`}
              onClick={handleEndTurn}
            >
              End Turn
            </button>
          </div>
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
