const router = require('express').Router()
const {Game, User, GamePlayer} = require('../db/models')
const {
  checkSet,
  findSet,
  shuffle,
  numberToTuple
} = require('../../client/gameUtils.js')
const customId = require('custom-id')
const {io} = require('./index.js')
module.exports = router

//const CARDS_IN_DECK = 81
const CARDS_IN_DECK = 81

router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll()
    res.json(games)
  } catch (err) {
    next(err)
  }
})

router.get('/:code', async (req, res, next) => {
  try {
    const game = await Game.findOne({
      where: {code: req.params.code}
    })
    res.json(game)
  } catch (err) {
    next(err)
  }
})

router.post('/new', async (req, res, next) => {
  try {
    const deck = []
    const firstTwelve = []
    for (let i = 0; i < CARDS_IN_DECK; i++) deck.push(i)
    shuffle(deck)
    for (let i = 0; i < 12; i++) firstTwelve.push(deck[i])
    const newGame = await Game.create({
      code: customId({}),
      deck,
      cardsOnTheBoard: firstTwelve,
      nextCardPos: 12,
      cardsLeft: CARDS_IN_DECK - 12,
      foundSet: findSet(firstTwelve)
    })
    res.status(200).json(newGame)
  } catch (err) {
    next(err)
  }
})

router.put('/:gId/:pId/update-board', async (req, res, next) => {
  try {
    let threeCards = req.body
    const tuples = threeCards.map(n => numberToTuple(n))
    const isSet = checkSet(tuples)
    const game = await Game.findByPk(+req.params.gId)
    let {cardsOnTheBoard, nextCardPos, cardsLeft, foundSet} = game
    const min = Math.min(3, cardsLeft)
    if (isSet) {
      // clicked cards form a set
      //      const player = await User.findByPk(+req.params.pId)
      if (cardsOnTheBoard.length > 12 || min === 0)
        // had been stumped or no cards left --> don't deal three more
        for (let i = 0; i < 3; i++)
          cardsOnTheBoard.splice(cardsOnTheBoard.indexOf(threeCards[i]), 1)
      else {
        // replace clicked cards with 3 new cards
        for (let i = 0; i < Math.min(3, min); i++)
          cardsOnTheBoard.splice(
            cardsOnTheBoard.indexOf(threeCards[i]),
            1,
            game.deck[nextCardPos++]
          )
      }
      console.log(`current set stored on game: `, foundSet)
      let i = 0
      while (i < 2 && threeCards.includes(foundSet[i])) i++
      if (i === 2) {
        foundSet = findSet(cardsOnTheBoard)
        console.log(`new stored set on game: ${foundSet}`)
      }
      console.log('was a different set: ', threeCards)
      // if they're the same, need new set to store in `foundSet`

      /*      const updatedPlayer = await User.update(
         {sets: player.sets + 1},
         {where: {id: player.id}, returning: true, plain: true}
	 )*/
      let updatedGame = (await Game.update(
        {
          cardsOnTheBoard,
          nextCardPos,
          cardsLeft: CARDS_IN_DECK - nextCardPos,
          foundSet
        },
        {where: {id: game.id}, returning: true, plain: true}
      ))[1]
      if (cardsLeft === 0) {
        if (foundSet.length > 0) res.status(201).json(updatedGame)
        else {
          // if none, game over
          updatedGame = (await Game.update(
            {
              cardsOnTheBoard,
              nextCardPos,
              cardsLeft: CARDS_IN_DECK - nextCardPos,
              gg: true,
              foundSet: []
            },
            {where: {id: game.id}, returning: true, plain: true}
          ))[1]
          console.log(`no sets left`)
          res.status(202).send(updatedGame)
        }
      } else {
        // there are still cards left
        res.status(201).json(updatedGame)
      }
    } else res.status(200).send(game)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/players', async (req, res, next) => {
  try {
    // TODO: add players
    const userId = req.body
    const playerToAdd = await User.findByPk(userId)
    const gameId = parseInt(req.params.id, 10)
    const game = await Game.findByPk(gameId)
    //    console.log(playerToAdd)
    game.addPlayers(playerToAdd)
    res.status.json(game)
  } catch (err) {
    next(err)
  }
})

router.get('/:gId/stumped', async (req, res, next) => {
  try {
    const game = await Game.findByPk(+req.params.gId)
    let {cardsOnTheBoard, nextCardPos, deck} = game
    const min = Math.min(81 - nextCardPos, 3)
    for (let i = 0; i < min; i++) {
      cardsOnTheBoard.push(deck[nextCardPos++])
    }
    const updatedGame = await Game.update(
      {cardsOnTheBoard, nextCardPos},
      {where: {id: game.id}, returning: true, plain: true}
    )
    res.status(201).json(updatedGame[1])
  } catch (err) {
    next(err)
  }
})
