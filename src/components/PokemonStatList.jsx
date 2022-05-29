import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * The individual boxes that displays info about a pokemon
 * @param {Object} props - props passed from the full list and app
 * @param {Object} props.pokemon - object that contains the name, id and url for this pokemon
 * @param {number} props.id - the id of this pokemon
 * @param {boolean} props.shouldSetEnemy - if this should be set as an enemy during the initial render
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setCounter - function to set the state of the player count
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setEnemCounter - function to set the state of the enemy count
 * @param {React.MutableRefObject<number[]>} props.setPlayerSelectedIds - ref object, sets an array of the player selected ids
 * @param {React.MutableRefObject<number[]>} props.setEnemySelectedIds - ref object, sets an array of the enmemy selected ids
 * @param {React.MutableRefObject<Object[][]>} props.setPlayerSelectedStats - ref object, sets an array of arrays, each containing the player selected raw stats   
 * @param {React.MutableRefObject<Object[][]>} props.setEnemySelectedStats - ref object sets an array of arrays, each containing the enemy selected raw stats 
 * @returns 
 */
function PokemonStatsImg(props) {
  const {
    pokemon,
    id,
    setCounter,
    setEnemCounter,
    shouldSetEnemy,
    setPlayerSelectedIds,
    setEnemySelectedIds,
    setPlayerSelectedStats,
    setEnemySelectedStats,
  } = props;

  const [elementClass, setElementClass] = useState("stats");
  const [selectText, setSelectText] = useState("SELECT");

  const [detailStats, setDetailStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    let isMounted = true;
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(json => {
      if (isMounted) {
        setDetailStats(json.data);
        setLoading(false);
        if (shouldSetEnemy) {
          setEnemySelectedIds.current = [...setEnemySelectedIds.current, id];
          setEnemySelectedStats.current = [
            ...setEnemySelectedStats.current,
            json.data.stats,
          ];

          setEnemCounter(num => {
            if (num <= 0) {
              setEnemySelectedIds.current = setEnemySelectedIds.current.filter(
                e => e !== id
              );
              return (num = num);
            } else return (num -= 1);
          });
        }
      }
    });
    return () => {
      return (isMounted = false);
    };
  }, []);

  const handleHover = () => {
    if (elementClass === "stats") setElementClass("stats-hover");
    else if (elementClass === "stats-selected") return;
    else setElementClass("stats");
  };

  const handleClick = () => {
    if (elementClass == "stats-selected") {
      setElementClass("stats-hover");
      setSelectText(t => (t = "SELECT"));
      setCounter(num => num + 1);

      setPlayerSelectedIds.current = setPlayerSelectedIds.current.filter(
        e => e !== id
      );
      setPlayerSelectedStats.current = setPlayerSelectedStats.current.filter(
        e => e !== detailStats.stats
      );
    } else {
      setElementClass("stats-selected");
      setSelectText(t => (t = "DESELECT"));
      setCounter(num => num - 1);

      setPlayerSelectedIds.current = [...setPlayerSelectedIds.current, id];
      setPlayerSelectedStats.current = [
        ...setPlayerSelectedStats.current,
        detailStats.stats,
      ];
    }
  };

  if (loading) return <img src="/public/assets/loading.gif" className="loadingImg" />;

  return (
    <div
      id={id}
      className={elementClass}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <p className="text">{pokemon.name}</p>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt="no img"
        className="image"
        loading="lazy"
      />
      <ul className="detailStats">
        {detailStats.stats.map((value, i) => {
          const statName = value.stat.name;
          const shouldHalfArr = ["defense", "special-attack", "special-defense", "speed"];
          return (
            <li key={i}>
              {statName}
              <span className="detailStatsValue">{shouldHalfArr.includes(statName) ? `${~~(value.base_stat/2)}%` : value.base_stat}</span>
            </li>
          );
        })}
        <li>
          Types:
          {detailStats.types.map((type, i) => {
            return (
              <span className="detailStatsValue" key={i}>
                {" "}
                +{type.type.name}
              </span>
            );
          })}
        </li>
      </ul>

      <button onClick={handleClick} className="selectButton">
        {selectText}
      </button>
    </div>
  );
}

/**
 * Function to get an array of 3 random numbers, Highly inefficient: O((n-1)*n!)
 * @returns {number[]} - Each element will be a unique int
 */
const getRandomNums = () => {
  const arr = Array.from({ length: 3 }, () => Math.floor(Math.random() * 100));
  if (arr[1] !== arr[2] && arr[2] !== arr[3] && arr[1] !== arr[3]) return arr;
  else return getRandomNums();
};

/**
 * The part that contains all the pokemon avaliable for selection
 * @param {Object} props - props passed from app, then relays to indivudual pokemon components
 * @param {Array} props.pokemonStats - array of pokemons fetched from the api, each has an id and an url
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setFunction - function to set the state of the player count
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setEnemyFunction - function to set the state of the enemy count
 * @param {React.MutableRefObject<number[]>} props.setPlayerSelectedIds - ref object, sets an array of the player selected ids
 * @param {React.MutableRefObject<number[]>} props.setEnemySelectedIds - ref object, sets an array of the enmemy selected ids
 * @param {React.MutableRefObject<Object[][]>} props.setPlayerSelectedStats - ref object, sets an array of arrays, each containing the player selected raw stats   
 * @param {React.MutableRefObject<Object[][]>} props.setEnemySelectedStats - ref object sets an array of arrays, each containing the enemy selected raw stats 
 * @returns - a div that wraps all the individual pokemon boxes
 */
export default function PokemonStatList(props) {
  const enemyIds = getRandomNums();

  return (
    <div id="statsWrapper">
      {props.pokemonStats.map(pokemon => {
        let id = pokemon.url.split("/")[6];
        return (
          <PokemonStatsImg
            key={id}
            id={id}
            pokemon={pokemon}
            setCounter={props.setFunction}
            setEnemCounter={props.setEnemyFunction}
            shouldSetEnemy={enemyIds.includes(parseInt(id, 10) - 1)}
            setPlayerSelectedIds={props.setPlayerSelectedIds}
            setEnemySelectedIds={props.setEnemySelectedIds}
            setPlayerSelectedStats={props.setPlayerSelectedStats}
            setEnemySelectedStats={props.setEnemySelectedStats}
          />
        );
      })}
    </div>
  );
}
