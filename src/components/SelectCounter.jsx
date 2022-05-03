import React, {useState, useEffect} from "react"

export default function SelectCounter(props){

  const {count, enemCount, setStart} = props;

  return (
    <div className="counter">
      {
        count<0 ?
        <h1>You can only select 3 pokemons</h1>
        :
        <h1>You have {count} pokemons left to select</h1>
      }
      {
        enemCount===0 ?
        <h3>The enemy is ready</h3>
        :
        <h3>The enemy have {enemCount} pokemons left to select</h3>
      }
      {
        count===0 && enemCount===0 ? 
        <button className="goButton" onClick={()=>setStart(true)}>GO</button>
        :
        <button className="goButton" disabled>NOT READY</button>
      }
    </div>
  )
}
