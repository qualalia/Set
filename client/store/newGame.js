const axios = require('axios')
const history = require('../history.js')
const {dealCard} = require('./dealCard.js')
const {red} = require('chalk')

// ACTION TYPES
const NEW_GAME = 'NEW_GAME'

// INITIAL STATE
const initialState = {}

// ACTION CREATORS
const newGame = game => ({type: NEW_GAME, game})

// THUNK CREATORS
export const getGame = () => async dispatch => {
  try {
    const {data} = await axios.post('/api/games/new')
    dispatch(newGame(data))
  } catch (err) {
    console.error(red(err))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.game
    default:
      return state
  }
}
