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
  threeCards.map(n => numberToTuple(n))
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

const findSet = cards => {
  let rho = []
  for (let i = 0; i < cards.length; i++) {
    rho = []
    rho.push(cards[i])
    for (let j = i + 1; j < cards.length - 1; j++) {
      rho.push(cards[j])
      for (let k = 0; k < cards.length - 2; k++) {
        if (cards[k] === cards[i]) k++
        if (cards[k] === cards[j]) k++
        rho.push(cards[k])
        console.log(rho)
        if (checkSet(rho)) return [rho[0], rho[1]]
        else break
      }
    }
  }
  return []
}

/*const dealCard = (deck, nextCardPos) => {
  if (nextCardPos >= 0 && nextCardPos < deck.length) {
    let toDeal = deck[nextCardPos]
    return toDeal
  }
  return []
}*/

const shuffle = cards => {
  for (let i = 0; i < cards.length; i++) {
    let swapPos = Math.floor(Math.random() * 81)
    let temp = cards[i]
    cards[i] = cards[swapPos]
    cards[swapPos] = temp
  }
}

module.exports = {checkSet, numberToTuple, findSet, shuffle}
