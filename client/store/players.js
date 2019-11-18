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
export const join = (gId, uId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/games/${gId}/players`, uId)
    dispatch(joinGame(data || defaultGame))
  } catch (err) {
    console.error(err)
  }
}

// Reducer
export default function(state = defaultGame, action) {
  switch (action.type) {
    case JOIN_GAME:
      return action.player
    default:
      return state
  }
}
