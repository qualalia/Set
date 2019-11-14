import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {GameBoard, DealPile} from '../components'
import {getDeck} from '../store/newDeck.js'
import {dealCard} from '../gameUtils'

const Game = props => {
  const deck = useSelector(state => state.newDeck)
  const clickedCard = useSelector(state => state.toggleClicked)
  const cards = deck.cards || []
  console.log(deck)
  const newGameCards = []
  const addThree = []
  let nextCardPos = deck.nextCardPos
  let threeCards = []

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDeck())
  }, [])

  for (let i = 0; i < 12; i++) newGameCards.push(dealCard(cards, nextCardPos++))
  console.log('cards for new game: ', newGameCards)

  const handleStumped = () => {
    // pass in something (like 'true') if stumped
    for (let i = 0; i < 3; i++) addThree.push(dealCard(cards, nextCardPos++))
    console.log('stumped --> 3 more cards: ', addThree)
  }

  const handleClickCard = tuple => {
    if (threeCards.includes(tuple)) {
      threeCards.splice(threeCards.indexOf(tuple), 1)
      console.log('cards clicked so far: ', threeCards)
    } else if (threeCards.length < 3) {
      threeCards.push(tuple)
      console.log('cards clicked so far: ', threeCards)
      if (threeCards.length === 3) checkSet(threeCards)
    } else threeCards = []
  }

  const checkSet = threeCards => {
    for (let i = 0; i < 4; i++) {
      let sum = 0
      for (let j = 0; j < threeCards.length; j++) {
        sum += threeCards[j][i]
        console.log('sum so far: ', sum)
      }
      if (sum % 3 !== 0) return false
    }
    return true
  }
  console.log('set? ', checkSet(threeCards))

  return (
    <div id="playing-area">
      <GameBoard
        cardsToDeal={newGameCards}
        clickedCards={threeCards}
        onClick={handleClickCard}
      />
      <DealPile anyLeft={cards.length && true} onClick={handleStumped} />
    </div>
  )
}

export default Game
