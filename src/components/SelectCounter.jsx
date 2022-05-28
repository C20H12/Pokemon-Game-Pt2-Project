import React, { useState } from "react";

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

  const [shouldShowHelp, setShouldShowHelp] = useState(false);

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
      <div
        className="question"
        onMouseEnter={() => setShouldShowHelp(true)}
        onMouseLeave={() => setShouldShowHelp(false)}
      >
        ?
      </div>
      {shouldShowHelp ? <div className="helpMsgBox">
        <ul>
          <li>Health: the Hp, a pokemon dies when this reaches 0</li>
          <li>Attack Multiplier: the damage it can deal, n/20 &lt;= f(n) &lt;= 3n/10, n is this number</li>
          <li>Defense: chance to resist 25% of incoming damage</li>
          <li>SP Attack: chance to deal 50% more damage</li>
          <li>SP Defense: chance to resist 50% of incoming damage</li>
          <li>Speed: chance to dodge an attack, taking 0 damage</li>
        </ul>
      </div> : null}
    </div>
  );
}
