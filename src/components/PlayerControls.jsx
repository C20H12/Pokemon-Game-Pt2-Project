import React from "react";

export default function PlayerControls(props) {
  const {
    isAllControlsAvailable,
    isAttackAvailableArr,
    isSelectedEnemyAlive,
    isSelectedPlayerAlive,
    hasPlayerActed,
    selectedAttackerAttackVal,
    attackFunction,
  } = props;

  return (
    <>
      {isAllControlsAvailable ? (
        <div className="controls">
          {Array(3)
            .fill(null)
            .map((_, i) => {
              return (
                <React.Fragment key={i}>
                  {isAttackAvailableArr[i] ? (
                    <button
                      data-attack={i + 1}
                      onClick={attackFunction}
                      data-tip-text={(() => {
                        if (i === 0) {
                          return `Damage: ${~~(
                            selectedAttackerAttackVal * 0.05
                          )} - ${~~(
                            selectedAttackerAttackVal * 0.1
                          )} HP\n Costs: 7 - 15 EG`;
                        } else if (i === 1) {
                          return `Damage: ${~~(
                            selectedAttackerAttackVal * 0.1
                          )} - ${~~(
                            selectedAttackerAttackVal * 0.2
                          )} HP\n Costs: 16 - 25 EG`;
                        } else if (i === 2) {
                          return `Damage: ${~~(
                            selectedAttackerAttackVal * 0.2
                          )} - ${~~(
                            selectedAttackerAttackVal * 0.3
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
                    if (isSelectedEnemyAlive === false)
                      return "The selected enemy has been killed!";
                    else if (hasPlayerActed) return "Already acted this turn!";
                    else if (isSelectedPlayerAlive === false)
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
    </>
  );
}
