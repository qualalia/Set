const numberToTuple = x => {
  if (x >= 81) console.log('out of range...somehow')
  const tuple = [
    x % 3,
    Math.floor(x / 3) % 3,
    Math.floor(x / 9) % 3,
    Math.floor(x / 27)
  ]
  return tuple
}

const checkSet = threeCards => {
  if (threeCards.length < 3 || threeCards.length > 3)
    return new Error('not enough cards')
  for (let i = 0; i < 4; i++) {
    let sum = 0
    for (let j = 0; j < 3; j++) {
      sum += threeCards[j][i]
    }
    if (sum % 3 !== 0) {
      return false
    }
  }
  return true
}

const findSet = (cards = []) => {
  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      if (j === i) continue
      for (let k = 0; k < cards.length; k++) {
        if (k === j || k === i) continue
        const currentTuple = [cards[i], cards[j], cards[k]].map(n =>
          numberToTuple(n)
        )
        if (checkSet(currentTuple)) {
          return [cards[j], cards[k]]
        }
      }
    }
  }
  return []
}

const shuffle = cards => {
  for (let i = 0; i < cards.length; i++) {
    let swapPos = Math.floor(Math.random() * cards.length)
    let temp = cards[i]
    cards[i] = cards[swapPos]
    cards[swapPos] = temp
  }
}

module.exports = {checkSet, numberToTuple, findSet, shuffle}
