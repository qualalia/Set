import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, Signup, UserHome, Game} from './components'
import {me} from './store'

const Routes = () => {
  const user = useSelector(state => state.user)
  const isLoggedIn = !!user.email
  const player = user
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(me)
  }, [])
  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      {isLoggedIn && (
        <Switch>
          {/* Logged in */}
          <Route path="/home" component={UserHome} />
        </Switch>
      )}
      <Route path="/solo" render={() => <Game player={player} />} />
    </Switch>
  )
}

export default withRouter(Routes)
