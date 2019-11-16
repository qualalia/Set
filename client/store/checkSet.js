import axios from 'axios'
import {red} from 'chalk'

// ACTION TYPES
const CHECK_SET = 'CHECK_SET'

// INITIAL STATE
const initialState = false

// ACTION CREATORS
const resultOfCheck = isSet => ({type: CHECK_SET, isSet})

// THUNK CREATORS
export const checkSet = threeCards => async dispatch => {
  try {
    const {data} = await axios.post('/api/game/check-set', threeCards)
    console.log(data)
    dispatch(resultOfCheck(data))
  } catch (err) {
    console.error(red(err))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CHECK_SET:
      return action.isSet
    default:
      return state
  }
}
