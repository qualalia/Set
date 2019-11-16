/**
 * ACTION TYPES
 */
const SET_CARD_CLICKED = 'SET_CARD_CLICKED'
const SET_CARD_UNCLICKED = 'SET_CARD_UNCLICKED'

/**
 * INITIAL STATE
 */
const blankCard = []

/**
 * ACTION CREATORS
 */
const setCardClicked = card => ({type: SET_CARD_CLICKED, card})
const setCardUnclicked = card => ({type: SET_CARD_UNCLICKED, card})

/**
 * THUNK CREATORS
 */
export const userClickCard = tuple => async dispatch => {
  dispatch(setCardClicked({val: number, isClicked: true}))
}

export const userUnclickCard = number => dispatch => {
  dispatch(setCardUnclicked({val: number, isClicked: false}))
}
/**
 * REDUCER
 */
export default function(state = blankCard, action) {
  switch (action.type) {
    case SET_CARD_CLICKED:
      return action.card
    case SET_CARD_UNCLICKED:
      return action.card
    default:
      return state
  }
}
