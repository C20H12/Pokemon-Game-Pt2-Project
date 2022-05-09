import React, {useState,useEffect,useRef} from "react"
import axios from "axios"

function PokemonStatsImg(props){
  const {
  pokemon, 
  id, 
  setCounter, 
  setEnemCounter, 
  shouldSetEnemy,
  setPlayerSelectedIds,
  setEnemySelectedIds} = props;

  const [elementClass, setElementClass] = useState("stats");
  const [selectText, setSelectText] = useState("SELECT");

  const [detailStats, setDetailStats] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    
    let isMounted = true;
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(json => {
        if(isMounted){          
          setDetailStats(json.data);
          setLoading(false);
          setEnemySelectedIds.current = [...setEnemySelectedIds.current, id];
          if(shouldSetEnemy) {  
            sessionStorage.setItem("enem"+id, JSON.stringify(json.data.stats));
            setEnemCounter(num => {
              if (num <= 0) {
                sessionStorage.removeItem('enem'+id);
                setEnemySelectedIds.current = 
                    setEnemySelectedIds.current.filter(e => e !== id);
                return num = num;
              }
              else return num -= 1;
            });
          }
        }
      });
    return () => {
      return isMounted = false;
    }
  }, []);


  const handleHover = ()=>{
    if (elementClass==="stats") setElementClass("stats-hover");
    else if (elementClass==="stats-selected") return;
    else setElementClass("stats");
  }

  const handleClick = ()=>{
    if (elementClass=="stats-selected"){
      setElementClass("stats-hover");
      setSelectText(t => t="SELECT");
      setCounter(num => num+1);
      
      setPlayerSelectedIds.current = setPlayerSelectedIds.current.filter(e => e !== id);
      sessionStorage.removeItem(id);
      sessionStorage.removeItem('img'+id)
    }else{
      setElementClass("stats-selected");
      setSelectText(t => t="DESELECT");
      setCounter(num => num-1);

      setPlayerSelectedIds.current = [...setPlayerSelectedIds.current, id];
      sessionStorage.setItem(id, JSON.stringify(detailStats.stats));
    }
  }
  


  if (loading) return <img src="../../loading.gif" className="loadingImg"/>;

  
  return (
    <div id={id} className={elementClass} 
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
      {
        detailStats.stats.map((value, i) => {
          return <li key={i}>{value.stat.name}<span className="detailStatsValue">{value.base_stat}</span></li>
        })
      }
        <li>
          Types:
          {
            detailStats.types.map((type, i) => {
              return <span className="detailStatsValue" key={i}> +{type.type.name}</span>
            })
          }
        </li>
      </ul>
      
      <button onClick={handleClick} className="selectButton">{selectText}</button>
        
    </div>
  )
}


export default function PokemonStatList(props){

  /**
  * Function to get an array of 3 random numbers
  * Highly inefficient: O((n-1)*n!)
  * @return: number[] -- Each element will be a unique int
  **/
  const getRandomNums = () => {
    const arr = Array.from({length: 3}, () => Math.floor(Math.random() * 400));
    if (arr[1]!==arr[2] && arr[2]!==arr[3] && arr[1]!==arr[3])
      return arr;
    else 
      return getRandomNums();
  }
  
  const enemyIds = getRandomNums();
  
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
              setEnemCounter={props.setEnemyFunction}
              shouldSetEnemy={enemyIds.includes(parseInt(id,10)-1)}
              setPlayerSelectedIds={props.setPlayerSelectedIds}
              setEnemySelectedIds={props.setEnemySelectedIds}
            />
          )
        })
      }
    </div>
  )
}
