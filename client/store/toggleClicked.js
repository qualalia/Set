//const axios = require('axios')
/**
 * ACTION TYPES
 */
const SET_CLICKED_CARDS = 'SET_CLICKED_CARDS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
export const setClickedCards = cards => ({type: SET_CLICKED_CARDS, cards})

/* export const toggleClicked = (clickedCards, card) => {
 *   setClicked(clickedCards)
 * }
 *  */
/**
 * THUNK CREATORS
 */
/*export const toggleClicked = (card, gameId, playerId) => async dispatch => {
   try {
   const {data} = await axios.put(
   `/api/games/${gameId}/${playerId}/click-card`,
   card
   )
   dispatch(toggleCardClicked(data))
   } catch (err) {
   console.error(red(err))
   }
   }*/

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CLICKED_CARDS:
      return [...action.cards]
    default:
      return state
  }
}
