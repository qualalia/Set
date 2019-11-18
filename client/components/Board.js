import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {newAnon} from '../store/'
import {Card, EndGame} from '../components'

const Board = props => {
  const game = useSelector(state => state.game)
  const user = useSelector(state => state.user)
  const yourSets = game.sets || 0
  const {cardsOnTheBoard, nextCardPos} = game
  const cardPlaces = []
  let slots = 12
  if (cardsOnTheBoard) slots = cardsOnTheBoard.length
  for (let i = 0; i < slots; i++) cardPlaces.push(i)

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
                ? {border: 5 + 'px solid gold', borderRadius: 25 + 'px'}
                : {}
            }
            tabIndex={0}
          >
            <Card key={`c${place}`} which={cardsOnTheBoard[place]} />
          </div>
        ))}
      </div>
      <div id="your-sets">
        <div>{yourSets}</div>
      </div>
    </div>
  ) : null
}

export default Board
