import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'

const Routes = () => {
  const user = useSelector(state => state.user)
  const isLoggedIn = !!user.id
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
    </Switch>
  )
}

export default withRouter(Routes)
