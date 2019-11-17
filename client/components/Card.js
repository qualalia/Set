import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setClickedCards} from '../store/toggleClicked.js'
import {numberToTuple} from '../gameUtils'
//import {Shape} from '../components'

const Card = props => {
  const {which} = props
  let clickedCards = useSelector(state => state.setClickedCards)
  const dispatch = useDispatch()
  const handleClick = () => {
    if (clickedCards.length > 3) {
      clickedCards = [which]
    } else if (clickedCards.includes(which)) {
      clickedCards.splice(clickedCards.indexOf(which), 1)
    } else clickedCards.push(which)
    dispatch(setClickedCards(clickedCards))
  }

  const tuple = numberToTuple(which)
  const howMany = []
  for (let i = 0; i < tuple[0]; i++) howMany.push(i)

  let theCard = {
    shape: tuple[1],
    fill: tuple[2],
    color: tuple[3]
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
      theCard.fill = `url(#diagonal-hatch-${theCard.color})`
      break
    case 2:
      theCard.fill = 'none'
      break
    default:
      theCard.fill = -1
  }

  if ([...Object.values(theCard)].includes(-1))
    return console.error('something went wrong in the tuple? ', tuple)

  const amount = tuple[0] + 1
  const shapesOnCard = []
  let parity = 1
  let dx = 0
  switch (theCard.shape) {
    case 'diamond':
      for (let i = 0; i < amount; i++) {
        parity = Math.pow(-1, i)
        // even
        if (amount % 2 === 0) {
          dx = 70 * (i - 1)
          shapesOnCard.push(
            <polygon
              points={`${130 + dx}, 20 ${150 + dx}, 70, ${130 +
                dx}, 120, ${110 + dx}, 70`}
              style={{
                fill: theCard.fill,
                color: theCard.color,
                stroke: theCard.color,
                strokeWidth: 3 + 'px',
                strokeLinecap: 'round'
              }}
            />
          )
        } else {
          // odd
          dx = i === 0 ? 0 : 60 * parity
          shapesOnCard.push(
            <polygon
              points={`${90 + dx}, 20 ${110 + dx}, 70, ${90 + dx}, 120, ${70 +
                dx}, 70`}
              style={{
                fill: theCard.fill,
                color: theCard.color,
                stroke: theCard.color,
                strokeWidth: 3 + 'px',
                strokeLinecap: 'round'
              }}
            />
          )
        }
      }
      break
    case 'oval':
      for (let i = 0; i < amount; i++) {
        parity = Math.pow(-1, i)
        // even
        if (amount % 2 === 0) {
          dx = 80 * (i - 1)
          shapesOnCard.push(
            <ellipse
              cx={130 + dx}
              cy={70}
              rx="23"
              ry="50"
              style={{
                fill: theCard.fill,
                color: theCard.color,
                stroke: theCard.color,
                strokeWidth: 3 + 'px',
                strokeLinecap: 'round',
                borderRadius: 25 + '%'
              }}
            />
          )
        } else {
          // odd
          dx = i === 0 ? 0 : 60 * parity
          shapesOnCard.push(
            <ellipse
              cx={90 + dx}
              cy={70}
              rx="23"
              ry="50"
              style={{
                fill: theCard.fill,
                color: theCard.color,
                stroke: theCard.color,
                strokeWidth: 3 + 'px',
                strokeLinecap: 'round'
              }}
            />
          )
        }
      }
      break
    case 'squiggle':
      for (let i = 0; i < amount; i++) {
        parity = Math.pow(-1, i)
        // even
        if (amount % 2 === 0) {
          dx = 70 * (i - 1)
          shapesOnCard.push(
            <rect
              x={110 + dx}
              y={23}
              width={40}
              height={90}
              style={{
                fill: theCard.fill,
                color: theCard.color,
                stroke: theCard.color,
                strokeWidth: 3 + 'px',
                strokeLinecap: 'round'
              }}
            />
          )
        } else {
          // odd
          dx = i === 0 ? 0 : 60 * parity
          shapesOnCard.push(
            <rect
              x={70 + dx}
              y={20}
              width={40}
              height={90}
              style={{
                fill: theCard.fill,
                color: theCard.color,
                stroke: theCard.color,
                strokeWidth: 3 + 'px',
                strokeLinecap: 'round'
              }}
            />
          )
        }
      }
      break
    default:
      break
  }

  return (
    <svg className="single-card" onClick={() => handleClick()}>
      <defs>
        <pattern
          id="diagonal-hatch-purple"
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
        >
          <path
            className="path"
            d="M-1,1 l2,-2
	  M0,4 l4,-4
	  M3,5 l2,-2"
            style={{stroke: 'purple', strokeWidth: 1}}
          />
        </pattern>
        <pattern
          id="diagonal-hatch-green"
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
        >
          <path
            className="path"
            d="M-1,1 l2,-2
	  M0,4 l4,-4
	  M3,5 l2,-2"
            style={{stroke: 'green', strokeWidth: 1}}
          />
        </pattern>
        <pattern
          id="diagonal-hatch-red"
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
        >
          <path
            className="path"
            d="M-1,1 l2,-2
	  M0,4 l4,-4
	  M3,5 l2,-2"
            style={{stroke: 'red', strokeWidth: 1}}
          />
        </pattern>
      </defs>
      {shapesOnCard.map((shape, index) => {
        return <g key={`${shape.props.style.color}${index}`}>{shape}</g>
      })}
    </svg>
  )
}

export default Card

/* nice squiggle but only as stroke:
   <path d="M40,20 C70,70 5,60 34,100"
   style={{
   fill: 'none',
   color: theCard.color,
   stroke:'url(#diagonalHatch)',// theCard.color,
   strokeWidth: 30 + 'px',
   strokeLinecap: 'round',
   border: `${2}px solid ${theCard.color}`,
   outline: 2 + 'px'
   }}/>*/
