export const dealCard = (deck, nextCardPos) => {
  if (nextCardPos >= 0 && nextCardPos < deck.length) {
    let toDeal = deck[nextCardPos]
    toDeal.setFaceUp(true)
    nextCardPos++
    return toDeal
  }
  return 'No cards left!'
}

export const shuffle = cards => {
  for (let i = 0; i < cards.length; i++) {
    let swapPos = Math.floor(Math.random() * 81)
    let temp = cards[i]
    cards[i] = cards[swapPos]
    cards[swapPos] = temp
  }
}

export const getNextCardPos = deck => deck.nextCardPos

export const setNextCardPos = (deck, theNextPos) => {
  deck.nextCardPos = theNextPos
}
