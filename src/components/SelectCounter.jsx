import React from "react";

/**
 * the part at the top showing how many are selected and the start button
 * @param {Object} props - the props passed from app
 * @param {number} props.count - how many pokemons tha player has selected
 * @param {number} props.enemCount - how many pokemons the enemy has selected
 * @param {Function} props.setStart - runs when the start is clicked, stops app from rendering the list and renders the battle
 * @returns {JSX.Element} - a div
 */
export default function SelectCounter(props) {
  const { count, enemCount, setStart } = props;

  return (
    <div className="counter">
      {count < 0 ? (
        <h1>You can only select 3 pokemons</h1>
      ) : (
        <h1>You have {count} pokemons left to select</h1>
      )}
      {enemCount === 0 ? (
        <h3>The enemy is ready</h3>
      ) : (
        <h3>The enemy have {enemCount} pokemons left to select</h3>
      )}
      {count === 0 && enemCount === 0 ? (
        <button className="goButton" onClick={() => setStart(true)}>
          GO
        </button>
      ) : (
        <button className="goButton" disabled>
          NOT READY
        </button>
      )}
    </div>
  );
}
