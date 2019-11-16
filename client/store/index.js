import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import newDeck from './newDeck'
import newGame from './newGame.js'
import toggleClicked from './toggleClicked'
import checkSet from './checkSet'
import dealCard from './dealCard.js'

const reducer = combineReducers({
  user,
  newDeck,
  checkSet,
  toggleClicked,
  newGame,
  dealCard
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
