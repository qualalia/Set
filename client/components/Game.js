import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Board, DealPile} from '../components'
import {checkSet} from '../store/checkSet.js'
import {playerClickCard} from '../store/toggleClicked.js'
import {newGame, updateGame} from '../store/game.js'

const Game = props => {
  const game = useSelector(state => state.game)
  const user = useSelector(state => state.user)
  const cards = game.deck || []
  let ilyaSet = useSelector(state => state.checkSet)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newGame())
  }, [])

  let clickedCards = useSelector(state => state.toggleClicked)
  if (clickedCards.length === 3) dispatch(checkSet(clickedCards))
  if (ilyaSet) {
    dispatch(updateGame(clickedCards, user.id, game.id))
    dispatch(playerClickCard(clickedCards[0], game.id, user.id))
    dispatch(playerClickCard(clickedCards[1], game.id, user.id))
    dispatch(playerClickCard(clickedCards[2], game.id, user.id))
    dispatch(checkSet(clickedCards))
  }

  return (
    <div id="playing-area">
      <Board />
      <DealPile anyLeft={!!cards.length} onClick={() => 'stumped'} />
    </div>
  )
}

export default Game
