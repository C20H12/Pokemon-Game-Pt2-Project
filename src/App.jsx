import React, {useState, useEffect} from 'react';
import axios from "axios";
import './App.css';
import PokemonStatList from './components/PokemonStatList.jsx';
import SelectCounter from './components/SelectCounter.jsx';
import BattleUi from "./components/BattleUi.jsx"


const App = () => {
  const [stat, setStat] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    sessionStorage.clear();
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=400")
      .then(json => {
        setLoading(false);
        setStat(json.data.results)
      })
  }, []);


  const [selectedPokemonsCounter, setSelectedPokemonsCounter] = useState(3);
  const [enemyPokemonsCounter, setEnemyPokemonsCounter] = useState(3);

  const [shouldStart, setShouldStart] = useState(false);
  
  if(loading) return <div id="loading">LOADING...</div>

  if(shouldStart) return <BattleUi/>;
  
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
      />
    </>
  );
}

export default App;