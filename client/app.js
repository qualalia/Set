import React from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router'
import {Navbar} from './components'
import Routes from './routes'
import {Card} from './components'

const App = ({history}) => {
  const game = useSelector(state => state.game)
  return (
    <div>
      {game.deck ? (
        <Navbar />
      ) : (
        <div id="homescreen-set">
          <div
            className="homescreen-card"
            onClick={() => history.push('/solo')}
            style={{color: 'blue'}}
          >
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
      )}
      <Routes />
    </div>
  )
}

export default withRouter(App)
