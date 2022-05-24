import React, { useRef } from "react";

/**
 * The info box that shows the hp and energy of the player or enemy
 * @param {Object} props - the values passed
 * @param {"player" | "enemy"} props.side - the side the pokemon is on
 * @param {boolean} props.shouldShow - whether this info box should show or not
 * @param {Object} props.stats - the full stats of the pokemon
 * @returns {JSX.Element} - an element containing the info box or nothing
 */

export default function BattleInfoBox(props) {
  const { side, shouldShow, stats } = props;

  const max = useRef(stats.hp);

  return (
    <>
      {shouldShow ? (
        <div className={side + "Details"}>
          Health: &nbsp;
          <label htmlFor={side + "Hp"}>{stats.hp}</label>
          <progress
            id={side + "Hp"}
            className={
              stats.hp < 60
                ? stats.hp < 25
                  ? "bar under25"
                  : "bar under60"
                : "bar"
            }
            value={stats.hp}
            max={max.current}
          />
          Energy: &nbsp;
          <label htmlFor={side + "Eg"}>{stats.eg}</label>
          <progress
            id={side + "Eg"}
            className={
              stats.eg < 60
                ? stats.eg < 25
                  ? "bar under25"
                  : "bar under60"
                : "bar"
            }
            value={stats.eg}
            max="100"
          />
        </div>
      ) : null}
    </>
  );
}
