import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {Board, EndGame} from '../components'
import {setClickedCards} from '../store/toggleClicked.js'
import {newGame, updateGame} from '../store/game.js'

const Game = props => {
  const game = useSelector(state => state.game)
  const user = useSelector(state => state.user)
  //  const player = useSelector(state => state.player)
  let clickedCards = useSelector(state => state.setClickedCards)
  const cards = game.deck || []
  const {nextCardPos} = game
  //  let isStumped = false;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newGame())
  }, [])

  if (clickedCards.length === 3) {
    dispatch(updateGame(clickedCards, user.id, game.id))
    dispatch(setClickedCards([]))
  }

  const handleStumped = () => {
    dispatch(showHint(game.cardsOnTheBoard))
    console.log("you're stumped")
  }

  return nextCardPos ? (
    nextCardPos === 81 ? (
      <EndGame />
    ) : (
      <div id="playing-area">
        <Board clickedCards={clickedCards} />
        <Button
          id="stumped-btn"
          color="black"
          disabled={!!(81 - nextCardPos < 3)}
          onClick={handleStumped}
        >
          Stumped?
        </Button>
      </div>
    )
  ) : null
}

export default Game
