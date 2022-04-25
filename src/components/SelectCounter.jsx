import React, {useState, useEffect} from "react"

export default function SelectCounter(){

  const [selected, setSelected] = useState(3);
  
  
  return <h1>You have {selected} left to select</h1>
}
