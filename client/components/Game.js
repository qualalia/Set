import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import {Board, EndGame} from '../components'
import {setClickedCards} from '../store/toggleClicked.js'
import {newGame, getGame, updateGame} from '../store/game.js'
import {showHint} from '../store/hint.js'

const Game = props => {
  const game = useSelector(state => state.game)
  const user = useSelector(state => state.user)
  //  const player = useSelector(state => state.player)
  let clickedCards = useSelector(state => state.setClickedCards)
  const cards = game.deck || []
  const {nextCardPos} = game
  //  let isStumped = false;
  const dispatch = useDispatch()
  const {code} = props
  console.log(code)

  useEffect(
    () => {
      if (code) {
        dispatch(getGame(code))
      } else {
        dispatch(newGame())
      }
    },
    [code]
  )

  useEffect(
    () => {
      if (game.code) {
        props.history.push(`/play/${game.code}`)
      }
    },
    [game.code]
  )

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

export default withRouter(Game)
