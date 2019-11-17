const axios = require('axios')
const {red} = require('chalk')
/**
 * ACTION TYPES
 */
const TOGGLE_CARD_CLICKED = 'TOGGLE_CARD_CLICKED'

/**
 * INITIAL STATE
 */
const blankCard = []

/**
 * ACTION CREATORS
 */
const toggleCardClicked = card => ({type: TOGGLE_CARD_CLICKED, card})

/**
 * THUNK CREATORS
 */
export const playerClickCard = (card, gameId, playerId) => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/games/${gameId}/${playerId}/click-card`,
      card
    )
    dispatch(toggleCardClicked(data))
  } catch (err) {
    console.error(red(err))
  }
}

/**
 * REDUCER
 */
export default function(state = blankCard, action) {
  switch (action.type) {
    case TOGGLE_CARD_CLICKED:
      return action.card
    default:
      return state
  }
}
