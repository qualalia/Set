import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {GameBoard, DealPile} from '../components'
import {getDeck} from '../store/newDeck.js'
import {dealCard} from '../gameUtils'

const Game = props => {
  const deck = useSelector(state => state.newDeck)
  const cards = deck.cards || []
  console.log(deck)
  const cardsOnTheBoard = []
  let cardsToDeal = []
  let nextCardPos = deck.nextCardPos
  let threeCards = []

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDeck())
  }, [])

  for (let i = 0; i < 12; i++)
    cardsOnTheBoard.push(dealCard(cards, nextCardPos++))
  console.log('cards for new game: ', cardsOnTheBoard)

  const handleStumped = () => {
    dealThree()
    console.log('stumped --> 3 more cards: ', cardsToDeal)
  }

  const handleClickCard = tuple => {
    if (threeCards.includes(tuple)) {
      threeCards.splice(threeCards.indexOf(tuple), 1)
    } else if (threeCards.length < 3) {
      threeCards.push(tuple)
      if (threeCards.length === 3) {
        //dispatch(checkSet(threeCards))
        checkSet(threeCards)
        threeCards = []
      }
    } else threeCards = []
  }

  // move to GET /set
  const checkSet = threeCards => {
    for (let i = 0; i < 4; i++) {
      let sum = 0
      for (let j = 0; j < threeCards.length; j++) {
        sum += threeCards[j][i]
      }
      if (sum % 3 !== 0) {
        alert('not a set')
        threeCards = []
        return false
      }
    }
    alert('set!')
    // remove clicked cards from deck
    while (threeCards.length) {
      const indexToReplace = cardsOnTheBoard.indexOf(threeCards[0])
      cardsOnTheBoard.splice(
        indexToReplace,
        1,
        dealCard(cards, nextCardPos++) || []
      )
    }
    return true
  }

  const dealThree = () => {
    for (let i = 0; i < 3; i++) cardsToDeal.push(dealCard(cards, nextCardPos++))
  }

  return (
    <div id="playing-area">
      <GameBoard
        cardsToDeal={cardsOnTheBoard}
        clickedCards={threeCards}
        onClick={handleClickCard}
      />
      <DealPile anyLeft={cards.length && true} onClick={handleStumped} />
    </div>
  )
}

export default Game
