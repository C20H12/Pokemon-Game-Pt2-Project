import React, { useState } from "react";
import BattleInfoBox from "./BattleInfoBox.jsx";

/**
 * The player component
 * @param {Object} props - the props passed
 * @param {number} props.id - the id of this pokemon
 * @param {Object} props.stats - the full, mutated stats of this pokemon
 * @param {Function} props.setTarget - the function to select this pokemon
 * @returns {JSX.Element} - an element containing the pokemon's image and it's info box
 */
export function BattlePlayer(props) {
  const { id, stats, setTarget } = props;

  const [shouldShowInfo, setShouldShowInfo] = useState(false);

  const handleShowInfo = () => {
    setShouldShowInfo(bool => (bool = !bool));
  };

  return (
    <div
      className="player"
      onMouseEnter={handleShowInfo}
      onMouseLeave={handleShowInfo}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt="err"
      />
      <BattleInfoBox
        side="player"
        shouldShow={shouldShowInfo}
        stats={stats}
        id={id}
      />
    </div>
  );
}

/**
 * The enemy component
 * @param {Object} props - the props passed
 * @param {number} props.id - the id of this pokemon
 * @param {Object} props.stats - the full, mutated stats of this pokemon
 * @param {Function} props.setTarget - the function to select this pokemon
 * @returns {JSX.Element} - an element containing the pokemon's image and it's info box
 */

export function BattleEnemy(props) {
  const { id, stats, setTarget } = props;

  const [shouldShowInfo, setShouldShowInfo] = useState(false);

  const [isSelectedAsTarget, setIsSelectedAsTarget] = useState(false);

  const handleShowInfo = () => {
    setShouldShowInfo(bool => (bool = !bool));
  };

  return (
    <div
      className={isSelectedAsTarget ? "enemySelected" : "enemy"}
      onMouseEnter={handleShowInfo}
      onMouseLeave={handleShowInfo}
      onClick={() => {
        setTarget(id);
        setIsSelectedAsTarget(bool => {
          if (bool) return bool;
          return !bool
          // TODO : move the select state to ui
        });
      }}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt="err"
      />
      <BattleInfoBox
        side="enemy"
        shouldShow={shouldShowInfo}
        stats={stats}
        id={id}
      />
    </div>
  );
}
