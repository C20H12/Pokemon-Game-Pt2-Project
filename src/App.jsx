import React, {useState, useEffect} from 'react';
import axios from "axios";
import './App.css';
import PokemonStatList from './components/PokemonStatList.jsx';
import SelectCounter from './components/SelectCounter.jsx'

const App = () => {
  const [stat, setStat] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=1000")
      .then(json => {
        setLoading(false);
        setStat(json.data.results)
      })
  }, []);


  const [selectedPokemonsCounter, setSelectedPokemonsCounter] = useState(3);
  const [canSelect, setCanSelect] = useState(true);

  const [resetSelectedClass, setResetSelectedClass] = useState(false);

  
  if(loading) return <div id="loading">LOADING...</div>
  
  return (
    <>
      <SelectCounter 
        count={selectedPokemonsCounter}
        setCount={setSelectedPokemonsCounter}
        setCanSelect={setCanSelect}
        setReset={setResetSelectedClass}
      />
      <PokemonStatList 
        pokemonStats={stat} 
        setFunction={setSelectedPokemonsCounter}
        canSelect={canSelect}
        setCanSelect={setCanSelect}
        shouldReset={resetSelectedClass}
      />
    </>
    
  );
}

export default App;