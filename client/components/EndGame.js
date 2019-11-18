import React from 'react'
import {useSelector} from 'react-redux'
//import {Segment} from 'semantic-ui-react'

const EndGame = props => {
  const {game} = useSelector(state => state.game)
  const {player} = game
  const sets = player.sets
  return game ? <div id="gg">You got {sets} sets</div> : null
}

export default EndGame
