const {findSet} = require('../gameUtils')

const SHOW_HINT = 'SHOW_HINT'

const setHint = hint => ({type: SHOW_HINT, hint})

export const showHint = cards => dispatch => {
  dispatch(setHint(findSet(cards)))
}

export default function(state = [], action) {
  switch (action.type) {
    case SHOW_HINT:
      return action.hint
    default:
      return state
  }
}
