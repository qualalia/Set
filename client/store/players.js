import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const JOIN_GAME = 'JOIN_GAME'

/**
 * INITIAL STATE
 */
const defaultGame = {}

/**
 * ACTION CREATORS
 */
const joinGame = player => ({type: JOIN_GAME, player})

/**
 * THUNK CREATORS
 */
export const join = (gameId, userId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/games/${gameId}/players`, userId)
    dispatch(joinGame(data || defaultGame))
  } catch (err) {
    console.error(err)
  }
}

// Reducer
export default function(state = defaultGame, action) {
  switch (action.type) {
    case JOIN_GAME:
      return [...state, action.player]
    default:
      return state
  }
}
