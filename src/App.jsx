import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PokemonStatList from "./components/PokemonStatList.jsx";
import SelectCounter from "./components/SelectCounter.jsx";
import BattleUi from "./components/BattleUi.jsx";

import "./css/mainPage.css";
import "./css/selectionList.css";
import "./css/battlePage.css";


/**
 * The main component of the application
 * @returns JSX.Element
 */
const App = () => {
  const [stat, setStat] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=100").then(json => {
      setLoading(false);
      setStat(json.data.results);
    });
  }, []);

  const [selectedPokemonsCounter, setSelectedPokemonsCounter] = useState(3);
  const [enemyPokemonsCounter, setEnemyPokemonsCounter] = useState(3);

  const [shouldStart, setShouldStart] = useState(false);

  const playerSelectedIds = useRef([]);
  const enemySelectedIds = useRef([]);

  const playerSelectedStats = useRef([]);
  const enemySelectedStats = useRef([]);

  if (loading) return <div id="loading">LOADING...</div>;

  if (shouldStart) {
    return (
      <BattleUi
        playerIds={playerSelectedIds}
        enemyIds={enemySelectedIds}
        playerStats={playerSelectedStats}
        enemyStats={enemySelectedStats}
      />
    );
  }

  return (
    <>
      <SelectCounter
        count={selectedPokemonsCounter}
        enemCount={enemyPokemonsCounter}
        setStart={setShouldStart}
      />
      <PokemonStatList
        pokemonStats={stat}
        setFunction={setSelectedPokemonsCounter}
        setEnemyFunction={setEnemyPokemonsCounter}
        setPlayerSelectedIds={playerSelectedIds}
        setEnemySelectedIds={enemySelectedIds}
        setPlayerSelectedStats={playerSelectedStats}
        setEnemySelectedStats={enemySelectedStats}
      />
    </>
  );
};

export default App;
