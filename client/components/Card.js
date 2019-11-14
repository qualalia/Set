import React from 'react'

const Card = props => {
  // props should include number, type, fill, color
  //  const { shape, number, style, fill, color } = props
  // ( ACTUALLY: JUST A NUMBER)
  //    example cubic: <path d="M100,250 C189,466 318,79 400,250" />
  return (
    <svg className="card" onClick={() => console.log('clicked')}>
      <rect />
    </svg>
  )
}

export default Card
