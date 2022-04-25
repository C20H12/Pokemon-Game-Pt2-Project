import React, {useState,useEffect} from "react"
import axios from "axios"


function PokemonStatsImg(props){
  const {pokemon, id, classFunctions} = props;
  
  const [elementClass,setElementClass,selectText,setSelectText] = classFunctions;
  
  const handleHover = ()=>{
    if (elementClass==="stats") setElementClass("stats-hover");
    else if (elementClass==="stats-selected") return;
    else setElementClass("stats");
  }

  const handleClick = ()=>{
    if (elementClass=="stats-selected"){
      setElementClass("stats-hover");
      setSelectText(t => t="SELECT");
    }
    else{
      setElementClass("stats-selected");
      setSelectText(t => t="DESELECT");
    }
  }


  const [detailStats, setDetailStats] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(json => {
        setDetailStats(json.data.stats);
        setLoading(false);
      })
  }, []);

  if (loading) return <img src="../../loading.gif" className="loadingImg"/>
  
  
  return (
    <div className={elementClass} onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <p className="text">{pokemon.name}</p>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`} alt="no img" className="image" loading="lazy"/>
      <ul className="detailStats">
      {
        detailStats.map((value, i) => {
          return <li key={i}>{value.stat.name}<span className="detailStatsValue">{value.base_stat}</span></li>
        })
      }
      </ul> 
      <button onClick={handleClick} className="selectButton">{selectText}</button>
    </div>
  )
}

export default function PokemonStatList(props){
  
  return(
    <div id="statsWrapper">
      {
        props.pokemonStats.map(pokemon => {
          let id = pokemon.url.split("/")[6];
          return (
            <PokemonStatsImg id={id} pokemon={pokemon} key={id} classFunctions={props.functions}/>
          )
        })
      }
    </div>
  )
}
