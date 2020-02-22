import React from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router'
import {Navbar} from './components'
import Routes from './routes'
import {Homescreen} from './components'
//import {Card} from './components'

const App = ({history}) => {
  const game = useSelector(state => state.game)
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default withRouter(App)
