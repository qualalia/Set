import React from 'react'

const EndGame = props => {
  const {code} = props
  return code ? (
    <h1 id="gg" style={{color: 'white'}}>
      GAME OVER
    </h1>
  ) : (
    <h1 style={{color: 'white'}}>error. how did you get here?</h1>
  )
}

export default EndGame
