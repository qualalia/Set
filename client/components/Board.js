import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {newAnon} from '../store/'
import {Card} from '../components'

const Board = props => {
  const game = useSelector(state => state.game)
  const cardsOnTheBoard = game.cardsOnTheBoard

  const cardPlaces = []
  for (let i = 0; i < 12; i++) cardPlaces.push(i)

  const clickedCards = useSelector(state => state.setClickedCards)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newAnon())
  }, [])

  return cardsOnTheBoard ? (
    <div id="game-board">
      <div id="cards">
        {cardPlaces.map(place => (
          <div
            className="card-outer-div"
            style={
              clickedCards.includes(cardsOnTheBoard[place])
                ? {border: 5 + 'px solid white', borderRadius: 25 + 'px'}
                : {}
            }
            tabIndex={0}
          >
            <Card key={`c${place}`} which={cardsOnTheBoard[place]} />
          </div>
        ))}
      </div>
      <div className="your-sets">
        <div>10</div>
      </div>
    </div>
  ) : null
}

export default Board
