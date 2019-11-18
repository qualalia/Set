import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {join} from '../store/players.js'

const Join = props => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  console.log(user)
  useEffect(() => {
    dispatch(join(user.id))
  }, [])
  return <div>waiting for a room</div>
}

export default Join
