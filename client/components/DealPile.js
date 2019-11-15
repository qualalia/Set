import React from 'react'
import {Card} from '../components'

const DealPile = props => {
  const {onClick, anyLeft} = props
  const visibility = anyLeft ? 'visible' : 'hidden'
  return <div id="draw-pile" onClick={onClick} style={{visibility}} />
}

export default DealPile
