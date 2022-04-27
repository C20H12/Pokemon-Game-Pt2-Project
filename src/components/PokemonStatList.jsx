import React, {useState,useEffect,useRef} from "react"
import axios from "axios"


function PokemonStatsImg(props){
  const {pokemon, id, setCounter, showSelectBtn, setShowSelectBtn, shouldReset} = props;

  const [elementClass, setElementClass] = useState("stats");
  const [selectText, setSelectText] = useState("SELECT");


  const handleHover = ()=>{
    if (elementClass==="stats") setElementClass("stats-hover");
    else if (elementClass==="stats-selected") return;
    else setElementClass("stats");
  }

  const handleClick = ()=>{
    if (elementClass=="stats-selected"){
      setElementClass("stats-hover");
      setSelectText(t => t="SELECT");
      setCounter(num => {
        if (num===3){
          setElementClass("stats");
          setSelectText(t => t="SELECT")
          return num+0;
        }
        else return num+1;
      });
    }
    else{
      setElementClass("stats-selected");
      setSelectText(t => t="DESELECT");
      setCounter(num => {
        if (num==1){
          setShowSelectBtn(false);
          return num-1;
        } 
        else return num-1;
      });
    }
  }
  

  const [detailStats, setDetailStats] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(json => {
        setDetailStats(json.data);
        setLoading(false);
      })
  }, []);

  if (loading) return <img src="../../loading.gif" className="loadingImg"/>

  
  return (
    <div id={id} className={elementClass} onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <p className="text">{pokemon.name}</p>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="no img" className="image" loading="lazy"/>
      <ul className="detailStats">
      {
        detailStats.stats.map((value, i) => {
          return <li key={i}>{value.stat.name}<span className="detailStatsValue">{value.base_stat}</span></li>
        })
      }
      <li>
        Types:
        {
          detailStats.types.map((type, i) => {
            return <span className="detailStatsValue" key={i}>+{type.type.name}</span>
          })
        }
      </li>
      </ul>
      {
      showSelectBtn ?
        <button onClick={handleClick} className="selectButton">{selectText}</button>
        :
        <span>Full</span>
      }
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
            <PokemonStatsImg 
              id={id} 
              pokemon={pokemon} 
              key={id}
              setCounter={props.setFunction}
              showSelectBtn={props.canSelect}
              setShowSelectBtn={props.setCanSelect}
            />
          )
        })
      }
    </div>
  )
}
