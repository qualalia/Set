import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {newAnon} from '../store/'
import {Card} from '../components'

const Board = props => {
  const game = useSelector(state => state.game)
  const cardPlaces = []
  for (let i = 0; i < 12; i++) cardPlaces.push(i)
  const cardsOnTheBoard = game.cardsOnTheBoard
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(newAnon())
  }, [])

  return cardsOnTheBoard ? (
    <div id="game-board">
      <div id="cards">
        {cardPlaces.map(place => <Card which={cardsOnTheBoard[place]} />)}
      </div>
      <div className="your-sets">
        <div>10</div>
      </div>
    </div>
  ) : null
}

export default Board
