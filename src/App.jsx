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


  const [elementClass, setElementClass] = useState("stats");
  const [selectText, setSelectText] = useState("SELECT");
  const setValuesAndFunction = [elementClass, setElementClass, selectText, setSelectText];

  if(loading) return <div id="loading">LOADING...</div>
  
  return (
    <>
      <SelectCounter />
      <PokemonStatList pokemonStats={stat} functions={setValuesAndFunction}/>
    </>
    
  );
}

export default App;