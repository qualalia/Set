import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import {Board, EndGame} from '../components'
import {setClickedCards} from '../store/toggleClicked.js'
import {newGame, getGame, updateGame} from '../store/game.js'
import {join} from '../store/players.js'
//import {showHint} from '../store/hint.js'
import {stumped} from '../store/game.js'

const Game = props => {
  const game = useSelector(state => state.game)
  const user = useSelector(state => state.user)
  //  const player = useSelector(state => state.player)
  let clickedCards = useSelector(state => state.setClickedCards)
  const cards = game.deck || []
  const {nextCardPos, cardsLeft} = game
  const dispatch = useDispatch()
  const {code} = props

  useEffect(
    () => {
      console.log('in first useEffect')
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
      console.log('in second useEffect')
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
    dispatch(stumped(game.id))
  }

  const handleHint = () => {
    //    dispatch(showHint(game.cardsOnTheBoard))
  }

  return nextCardPos ? (
    <div id="playing-area">
      <Board clickedCards={clickedCards} />
      <div id="stumped-hint">
        <Button
          className="stumped-btn"
          color="black"
          disabled={!!(81 - nextCardPos < 3)}
          onClick={handleStumped}
        >
          Stumped?
        </Button>
        <Button color="black" onClick={handleHint}>
          Hint
        </Button>
      </div>
    </div>
  ) : null
}

export default withRouter(Game)
