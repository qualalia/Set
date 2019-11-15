import React from 'react'
import {useSelector} from 'react-redux'
import {Card} from '../components'

const GameBoard = props => {
  const {cardsToDeal, clickedCards, onClick} = props
  const cardPlaces = []
  for (let i = 0; i < 12; i++) cardPlaces.push(i)

  return (
    <div id="game-board">
      {cardPlaces.map((place, index) => (
        <Card
          key={place}
          which={cardsToDeal[index]}
          clickedCards={clickedCards}
          onClick={onClick}
        />
      ))}
      <div className="your-sets">
        <div>10</div>
      </div>
    </div>
  )
}

export default GameBoard
