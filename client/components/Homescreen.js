import React from 'react'
import {Card} from '../components'

const Homescreen = () => {
  return (
    <div id="homescreen-set">
      <div className="homescreen-card" onClick={() => history.push('/solo')}>
        <div className="text-mouseover single-card">Solo</div>
        <Card className="homescreen-card" which={10} />
      </div>
      <div className="homescreen-card" onClick={() => console.log('multi')}>
        <div className="text-mouseover single-card">Multi</div>
        <Card which={1} />
      </div>
      <div className="homescreen-card" onClick={() => console.log('rules')}>
        <div className="text-mouseover single-card">Rules</div>
        <Card which={19} />
      </div>
    </div>
  )
}

export default Homescreen
