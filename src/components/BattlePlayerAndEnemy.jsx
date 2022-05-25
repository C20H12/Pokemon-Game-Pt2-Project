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
  const { id, stats, setAttacker, idx, isSelected, setIsSelected } = props;

  const [shouldShowInfo, setShouldShowInfo] = useState(false);

  const handleShowInfo = () => {
    setShouldShowInfo(bool => (bool = !bool));
  };

  const handleSelect = () => {
    setAttacker(id);
    setIsSelected(arr => {
      if (arr[idx]) return arr;
      return arr
        .slice()
        .fill(false)
        .fill(!arr[idx], idx, idx + 1);
    });
  };

  return (
    <div
      className={isSelected ? "playerSelected" : "player"}
      onMouseEnter={handleShowInfo}
      onMouseLeave={handleShowInfo}
      onClick={handleSelect}
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
  const { id, stats, setTarget, idx, isSelected, setIsSelected } = props;

  const [shouldShowInfo, setShouldShowInfo] = useState(false);

  const handleShowInfo = () => {
    setShouldShowInfo(bool => (bool = !bool));
  };

  const handleSelect = () => {
    setTarget(id);
    setIsSelected(arr => {
      if (arr[idx]) return arr;
      return arr
        .slice()
        .fill(false)
        .fill(!arr[idx], idx, idx + 1);
    });
  };

  return (
    <div
      className={isSelected ? "enemySelected" : "enemy"}
      onMouseEnter={handleShowInfo}
      onMouseLeave={handleShowInfo}
      onClick={handleSelect}
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
