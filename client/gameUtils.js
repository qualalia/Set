export const numberToTuple = x => {
  if (x >= 81) console.log('out of range...somehow')
  const tuple = [
    x % 3,
    Math.floor(x / 3) % 3,
    Math.floor(x / 9) % 3,
    Math.floor(x / 27)
  ]
  return tuple
}

export const checkSet = threeCards => {
  if (threeCards.length < 3 || threeCards.length > 3)
    return new Error('not enough cards')
  for (let i = 0; i < 4; i++) {
    let sum = 0
    for (let j = 0; j < 4; j++) {
      sum += threeCards[j][i]
      console.log(threeCards[j][i])
    }
    console.log(sum)
    if (sum % 3) return false
  }
  return true
}

export const dealCard = (deck, nextCardPos) => {
  if (nextCardPos >= 0 && nextCardPos < deck.length) {
    let toDeal = deck[nextCardPos]
    //    toDeal.setFaceUp(true)
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
