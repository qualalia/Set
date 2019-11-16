import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router'
import {Menu, Dropdown, Button} from 'semantic-ui-react'
import {logout, newAnon} from '../store'

const Navbar = ({history}) => {
  const user = useSelector(state => state.user)
  const isLoggedIn = !!user.email
  const dispatch = useDispatch()

  const options = [
    {
      key: 1,
      text: 'Solo',
      icon: 'user',
      value: 1,
      onClick: () => {
        if (!user.id) dispatch(newAnon())
        history.push('/solo')
      }
    },
    {
      key: 2,
      text: <i>Multiplayer (coming soon)</i>,
      icon: 'users',
      value: 2
    }
  ]

  return (
    <nav>
      <div id="title">Set</div>
      <div className="nav-items">
        <div className="new-game">
          <Menu compact>
            <Dropdown text="New Game" options={options} simple item />
          </Menu>
        </div>
        <div className="home-login">
          <Button
            onClick={() =>
              isLoggedIn ? history.push('/home') : history.push('/login')
            }
          >
            {user.username || 'Login'}
          </Button>
          {user.email ? (
            <Button onClick={() => dispatch(logout())}>Logout</Button>
          ) : (
            <span />
          )}
          <Button onClick={() => history.push('/signup')}>Signup</Button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
