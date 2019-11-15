const router = require('express').Router()
const {Deck} = require('../db/models')
module.exports = router

const shuffle = cards => {
  for (let i = 0; i < cards.length; i++) {
    let swapPos = Math.floor(Math.random() * 81)
    let temp = cards[i]
    cards[i] = cards[swapPos]
    cards[swapPos] = temp
  }
}

router.get('/', async (req, res, next) => {
  try {
    const cardsInDeck = []
    for (let i = 0; i < 81; i++) cardsInDeck.push(i)
    shuffle(cardsInDeck)
    const deck = await Deck.findOrCreate({where: {cards: cardsInDeck}})
    res.json(deck[0])
  } catch (err) {
    next(err)
  }
})
