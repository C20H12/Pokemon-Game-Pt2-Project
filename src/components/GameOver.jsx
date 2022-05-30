import React, {useEffect} from 'react'

export default function GameOver(props) {

  const {isWin, battleLog} = props;

  useEffect(() => {
    const key = isWin ? "wins" : "loses"
    const currNumber = parseInt(localStorage.getItem(key), 10);
    localStorage.setItem(key, currNumber+1);
  }, [])
  

  return (
    <div className='gameOver'>
      <h1>You {isWin ? "Won" : "Lost"}!</h1>
      <hr />
      <div className="options">
        <button onClick={() => window.location.reload()}>Start Another Game</button>
        <button onClick={() => window.close()}>Quit</button>
      </div>
      <details className='battleEndLog'>
        <summary>Below is your battle log:</summary>
        <pre>{battleLog}</pre>
      </details>
    </div>
  )
}


