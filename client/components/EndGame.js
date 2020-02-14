import React from 'react'
import {useSelector} from 'react-redux'
//import {Segment} from 'semantic-ui-react'

const EndGame = props => {
  const {game} = useSelector(state => state.game)
  //  const {player} = game
  //  const sets = player.sets
  return game ? <h1>GAME OVER</h1> : null
}

export default EndGame
