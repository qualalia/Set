import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toggleClicked} from '../store/toggleClicked'
import {numberToTuple} from '../gameUtils'
import {Shape} from '../components'

const Card = props => {
  const {which, onClick} = props
  //  const clicked = useSelector(state => state.card) // get that gorram redux store going
  //  const dispatch = useDispatch()
  const tuple = numberToTuple(which)
  // todo: render the card visually
  /*
     value: [i % 3],
     type: Math.floor(i / 3) % 3,
     fill: Math.floor(i / 9) % 3,
     color: Math.floor(i / 27),
   */
  let theCard = {
    number: tuple[0],
    shape: tuple[1],
    fill: tuple[2],
    color: tuple[3]
  }
  switch (theCard.number) {
    case 0:
      theCard.number = 1
      break
    case 1:
      theCard.number = 2
      break
    case 2:
      theCard.number = 3
      break
    default:
      theCard.number = -1
  }
  switch (theCard.shape) {
    case 0:
      theCard.shape = 'diamond'
      break
    case 1:
      theCard.shape = 'oval'
      break
    case 2:
      theCard.shape = 'squiggle'
      break
    default:
      theCard.shape = -1
  }
  switch (theCard.color) {
    case 0:
      theCard.color = 'red'
      break
    case 1:
      theCard.color = 'green'
      break
    case 2:
      theCard.color = 'purple'
      break
    default:
      theCard.color = -1
  }
  switch (theCard.fill) {
    case 0:
      theCard.fill = theCard.color
      break
    case 1:
      theCard.fill = 'url(#diagonalHatch)'
      break
    case 2:
      theCard.fill = 'none'
      break
    default:
      theCard.fill = -1
  }

  if ([...Object.values(theCard)].includes(-1))
    return console.error('something went wrong in the tuple? ', tuple)
  console.log(theCard)
  return (
    <svg className="card" onClick={() => onClick(tuple)}>
      <defs>
        <pattern
          id="diagonalHatch"
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
        >
          <path
            d="M-1,1 l2,-2
          M0,4 l4,-4
          M3,5 l2,-2"
            style={{stroke: theCard.color, strokeWidth: 1}}
          />
        </pattern>
      </defs>
      <g>
        <rect />
        {/*	<Shape value={tuple[0]} type={tuple[1]} fill={tuple[2]} color={tuple[3]} /> */}
        <text x="40" y="70" fill="black" fontSize="35">
          {`${tuple[0]}, ${tuple[1]}, ${tuple[2]}, ${tuple[3]}`}
        </text>
      </g>
      <g>
        {/* determine shape */}
        <circle
          cx="50"
          cy="50"
          r="20"
          style={{
            fill: theCard.fill,
            color: theCard.color,
            stroke: theCard.color,
            strokeWidth: 3 + 'px',
            strokeLinecap: 'round'
          }}
        />
      </g>
    </svg>
  )
}

export default Card
//    example cubic: <path d="M100,250 C189,466 318,79 400,250" />
