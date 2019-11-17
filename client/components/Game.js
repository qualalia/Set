import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Board, DealPile} from '../components'
import {checkSet} from '../store/checkSet.js'
//import {playerClickCard} from '../store/toggleClicked.js'
//import {toggleClicked} from '../store/toggleClicked.js'
import {setClickedCards} from '../store/toggleClicked.js'
import {newGame, updateGame} from '../store/game.js'

const Game = props => {
  const game = useSelector(state => state.game)
  const user = useSelector(state => state.user)
  const ilyaSet = useSelector(state => state.checkSet)
  let clickedCards = useSelector(state => state.setClickedCards)
  const cards = game.deck || []
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newGame())
  }, [])

  console.log('in Game: ', clickedCards)
  if (clickedCards.length === 3) {
    //    dispatch(checkSet(clickedCards))
    //    if (ilyaSet) {
    dispatch(updateGame(clickedCards, user.id, game.id))
    dispatch(setClickedCards([]))
    //      dispatch(checkSet(clickedCards))
  }

  return (
    <div id="playing-area">
      <Board clickedCards={clickedCards} />
      <DealPile anyLeft={!!cards.length} onClick={() => 'stumped'} />
    </div>
  )
}

export default Game
