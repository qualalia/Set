import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Card, GameBoard} from '../components'
import {getDeck} from '../store/newDeck.js'
import {dealCard} from '../gameUtils'

const Game = props => {
  const deck = useSelector(state => state.newDeck)
  console.log(deck)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDeck())
  }, [])

  return <GameBoard />
}

export default Game
