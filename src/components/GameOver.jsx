import React from 'react'

export default function GameOver(props) {

  const {isWin, battleLog} = props;

  return (
    <div className='gameOver'>
      <h1>You {isWin ? "Win" : "Lost"}!</h1>
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


