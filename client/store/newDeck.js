import axios from 'axios'
import history from '../history'
import {red} from 'chalk'

// ACTION TYPES
const NEW_DECK = 'NEW_DECK'

// INITIAL STATE
const initialState = {}

// ACTION CREATORS
const newDeck = deck => ({type: NEW_DECK, deck})

// THUNK CREATORS
export const getDeck = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/deck')
    console.log(data)
    /*
       value: [i % 3],
       type: Math.floor(i / 3) % 3,
       fill: Math.floor(i / 9) % 3,
       color: Math.floor(i / 27),
     */
    dispatch(newDeck(data || initialState))
  } catch (err) {
    console.error(red(err))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_DECK:
      return action.deck
    default:
      return state
  }
}
