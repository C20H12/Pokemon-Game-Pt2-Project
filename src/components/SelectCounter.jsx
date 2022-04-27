import React, {useState, useEffect} from "react"

export default function SelectCounter(props){

  const {count, setCount, setCanSelect, setReset} = props;

  const handleReset = ()=>{
    setCanSelect(true);
    setReset(true);
  }
  
  return (
    <div className="counter">
      <h1>You have {count} left to select</h1>
    {
      count===0 ? 
      <button>GO</button>
      :
      <button disabled>GO</button>
    }
      <button onClick={handleReset}>Reset Selection</button>
    </div>
  )
}
