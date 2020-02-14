import React from 'react'

const EndGame = props => {
  const {code} = props
  return code ? <h1>GAME OVER</h1> : <h1>error</h1>
}

export default EndGame
