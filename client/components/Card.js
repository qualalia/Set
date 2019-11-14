import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toggleClicked} from '../store/toggleClicked'
import {numberToTuple} from '../gameUtils'

const Card = props => {
  const {which, onClick} = props
  const clicked = useSelector(state => state.card)
  console.log(clicked)
  const dispatch = useDispatch()
  const tuple = numberToTuple(which)
  // todo: render the card visually
  /*
     value: [i % 3],
     type: Math.floor(i / 3) % 3,
     fill: Math.floor(i / 9) % 3,
     color: Math.floor(i / 27),
   */
  return (
    <svg className="card" onClick={() => onClick(tuple)}>
      <rect />
    </svg>
  )
}

export default Card
//    example cubic: <path d="M100,250 C189,466 318,79 400,250" />
