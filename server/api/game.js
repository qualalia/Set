const router = require('express').Router()
const {Game, User} = require('../db/models')
const {checkSet, shuffle} = require('../../client/gameUtils.js')
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

    //    const updatedGame = await game.addUser()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.post('/:gId/:pId/click-card', async (req, res, next) => {
  try {
    console.log(req.body)
    // want player info (username/anon) and card info (tuple)
    const game = await Game.findByPk(+req.params.gId)
    const player = await User.findOne({
      where: {username: req.params.pId}
    })
    console.log('game: ', game, 'player :', player)
    res.sendStatus(200)
    /*  if (clickedCards.includes(tuple)) {
    clickedCards.splice(clickedCards.indexOf(tuple), 1)
  }
  else if (clickedCards.length < 3) {
    clickedCards.push(tuple)
    if (clickedCards.length === 3) {
      console.log(clickedCards)
      dispatch(checkSet(clickedCards))
      // probably move this to the back, too, so that everyone can see
      while (clickedCards.length) {
	const indexToReplace = cardsOnTheBoard.indexOf(clickedCards[0])
	cardsOnTheBoard.splice(
	  indexToReplace,
	  1,
	  dealCard(cards, nextCardPos++) || []
	)
      }
      return true
    }
  }
   else clickedCards = []*/
  } catch (err) {
    next(err)
  }
})

router.post('/check-set', async (req, res, next) => {
  // make a dictionary of sets?
  try {
    const threeCards = req.body
    res.status(200).send(await checkSet(threeCards))
  } catch (err) {
    next(err)
  }
})
