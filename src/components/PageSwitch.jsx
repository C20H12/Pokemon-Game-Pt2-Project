import React from "react"

export default function PageSwitch({ next, prev }){
  return(
    <div>
      <button onClick={next}>NEXT</button>
      <button onClick={prev}>PREV</button>
    </div>
  )
}
