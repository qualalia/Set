import React from 'react'
import {Item} from 'semantic-ui-react'
import {Card} from '../components'

const GameBoard = props => {
  const cardPlaces = []
  for (let i = 0; i < 12; i++) cardPlaces.push(i)
  return (
    <div id="game-board">
      {cardPlaces.map(place => <Card key={place} />)}
      <div id="draw-pile" />
      <div className="your-sets">
        <div>10</div>
      </div>
    </div>
  )
}

export default GameBoard
