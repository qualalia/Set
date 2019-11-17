const router = require('express').Router()
const {Game, User} = require('../db/models')
const {checkSet, shuffle, numberToTuple} = require('../../client/gameUtils.js')
const customId = require('custom-id')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll()
    res.json(games)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const game = await Game.findOne({
      where: {id: +req.params.id},
      attributes: ['id', 'code', 'deck', 'nextCardPos', 'cardsOnTheBoard']
    })
    res.json(game)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/next-card', async (req, res, next) => {
  try {
    const game = await Game.findByPk(+req.params.id)
    const nextCard = game.deck[game.nextCardPos]
    const cardsOnTheBoard = game.cardsOnTheBoard
    await Game.update(
      {
        nextCardPos: game.nextCardPos + 1,
        cardsOnTheBoard: [...cardsOnTheBoard, nextCard]
      },
      {where: {id: game.id}}
    )
    res.status(200).json(nextCard)
  } catch (err) {
    next(err)
  }
})

router.post('/new', async (req, res, next) => {
  try {
    const deck = []
    const firstTwelve = []
    for (let i = 0; i < 81; i++) deck.push(i)
    shuffle(deck)
    for (let i = 0; i < 12; i++) firstTwelve.push(deck[i])
    const newGame = await Game.create({
      code: customId({}),
      deck,
      cardsOnTheBoard: firstTwelve,
      nextCardPos: 12
    })
    res.status(200).json(newGame)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/players', async (req, res, next) => {
  try {
    // TODO: add players
    const playerToAdd = req.body
    const gameId = +req.params.id
    const game = await Game.findByPk(gameId)
    console.log(playerToAdd)

    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.put('/:gId/:pId/click-card', async (req, res, next) => {
  try {
    const card = +Object.keys(req.body)[0]
    const game = await Game.findByPk(+req.params.gId)
    const player = await User.findByPk(+req.params.pId)
    let clickedCards = player.clickedCards

    if (clickedCards.length >= 3) {
      clickedCards = [card]
    } else if (clickedCards.includes(card)) {
      clickedCards.splice(clickedCards.indexOf(card), 1)
    } else clickedCards.push(card)

    await User.update({clickedCards}, {where: {id: player.id}})
    res.status(200).json(clickedCards)
  } catch (err) {
    next(err)
  }
})

router.post('/check-set', async (req, res, next) => {
  // make a dictionary of sets?
  try {
    if (Object.keys(req.body)[0] === 'false') {
      res.send(false)
    } else {
      let threeCards = req.body
      threeCards = threeCards.map(n => numberToTuple(n))
      res.status(200).send(checkSet(threeCards))
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:gId/:pId/update-board', async (req, res, next) => {
  try {
    const theSet = req.body
    const game = await Game.findByPk(+req.params.gId)
    const player = await User.findByPk(+req.params.pId)
    console.log('set: ', theSet, 'game id: ', game.id, 'player id: ', player.id)
    let {cardsOnTheBoard, nextCardPos} = game
    for (let i = 0; i < 3; i++) {
      cardsOnTheBoard.splice(
        cardsOnTheBoard.indexOf(theSet[i]),
        1,
        game.deck[nextCardPos++]
      )
    }
    await User.update({sets: player.sets + 1}, {where: {id: player.id}})
    const updatedGame = await Game.update(
      {cardsOnTheBoard, nextCardPos},
      {where: {id: game.id}, returning: true, plain: true}
    )
    res.status(200).json(updatedGame[1])
  } catch (err) {
    next(err)
  }
})
