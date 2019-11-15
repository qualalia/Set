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

  console.log(theCard)
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
              points={`${140 + dx}, 20 ${160 + dx}, 70, ${140 +
                dx}, 120, ${120 + dx}, 70`}
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
              points={`${100 + dx}, 20 ${120 + dx}, 70, ${100 + dx}, 120, ${80 +
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
              cx={140 + dx}
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
              cx={100 + dx}
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
              x={120 + dx}
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
              x={80 + dx}
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
    <svg className="card" onClick={() => onClick(tuple)}>
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
        return (
          <g>
            <rect />
            {/*<text x="40" y="70" fill="black" fontSize="35">
		{`${theCard.shape}, ${tuple[0]+1}`}
		</text>*/}
            <Shape className={shape.props.style.color} shape={shape} />
          </g>
        )
      })}
    </svg>
  )
}

export default Card
//    example cubic: <path d="M100,250 C189,466 318,79 400,250" />

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
