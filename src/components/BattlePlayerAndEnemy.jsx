import React, { useEffect, useState } from "react";
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
  const { id, stats, setAttacker, idx, isSelected, setIsSelected, isAlive } = props;

  const [shouldShowInfo, setShouldShowInfo] = useState(false);

  const handleShowInfo = () => {
    setShouldShowInfo(bool => (bool = !bool));
  };

  const handleSelect = () => {
    setAttacker(id);
    setIsSelected(arr => {
      if (arr[idx]) setAttacker(null);
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
        className={isAlive ? "alive" : "isDead"}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt="err"
      />
      <BattleInfoBox
        side="player"
        shouldShow={shouldShowInfo}
        stats={stats}
        id={id}
      />
      <div key={stats.modalContent} className="popup player">
        {stats.modalContent}
      </div>
    </div>
  );
}

/**
 * The enemy component
 * @param {Object} props - the props passed
 * @param {number} props.id - the id of this pokemon
 * @param {Object} props.stats - the full, mutated stats of this pokemon
 * @param {Function} props.setTarget - the function to select this pokemon
 * @param {boolean} props.isAlive - is this pokemon alive?
 * @returns {JSX.Element} - an element containing the pokemon's image and it's info box
 */

export function BattleEnemy(props) {
  const { id, stats, setTarget, idx, isSelected, setIsSelected, isAlive } =
    props;

  const [shouldShowInfo, setShouldShowInfo] = useState(false);

  const handleShowInfo = () => {
    setShouldShowInfo(bool => (bool = !bool));
  };

  const handleSelect = () => {
    setTarget(id);
    setIsSelected(arr => {
      if (arr[idx]) setTarget(null);
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
        className={isAlive ? "alive" : "isDead"}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt="err"
      />
      <BattleInfoBox
        side="enemy"
        shouldShow={shouldShowInfo}
        stats={stats}
        id={id}
      />
      <div key={stats.modalContent} className="popup">
        {stats.modalContent}
      </div>
    </div>
  );
}
