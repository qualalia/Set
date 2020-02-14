import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import game from './game.js'
import setClickedCards from './toggleClicked'
//import checkSet from './checkSet'
import players from './players.js'
import hint from './hint.js'

const reducer = combineReducers({
  user,
  //  checkSet,
  setClickedCards,
  game,
  hint,
  players
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './game'
export * from './hint'
export * from './players'
export * from './toggleClicked'
