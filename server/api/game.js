const router = require('express').Router()
const {Game, User, GamePlayer} = require('../db/models')
const {checkSet, shuffle, numberToTuple} = require('../../client/gameUtils.js')
const customId = require('custom-id')
module.exports = router

const CARDS_IN_DECK = 81

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
    for (let i = 0; i < CARDS_IN_DECK; i++) deck.push(i)
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
    const playerToAdd = await User.findByPk(+req.body)
    const gameId = +req.params.id
    const game = await Game.findByPk(gameId)
    console.log(playerToAdd)
    game.addPlayers(playerToAdd)
    res.status.json(game)
  } catch (err) {
    next(err)
  }
})

/*router.put('/:gId/:pId/click-card', async (req, res, next) => {
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
   })*/

/*router.post('/check-set', async (req, res, next) => {
   // keep track of sets?
   try {
   let threeCards = req.body
   threeCards = threeCards.map(n => numberToTuple(n))
   res.status(200).send(checkSet(threeCards))
   } catch (err) {
   next(err)
   }
   })*/

router.put('/:gId/:pId/update-board', async (req, res, next) => {
  try {
    let threeCards = req.body
    const tuples = threeCards.map(n => numberToTuple(n))
    const isSet = checkSet(tuples)
    const game = await Game.findByPk(+req.params.gId)
    const {nextCardPos} = game
    const min = Math.min(3, CARDS_IN_DECK - nextCardPos)
    //    console.log(nextCardPos)
    if (isSet) {
      const player = await User.findByPk(+req.params.pId)
      let {cardsOnTheBoard, nextCardPos} = game
      for (let i = 0; i < Math.min(3, min); i++) {
        cardsOnTheBoard.splice(
          cardsOnTheBoard.indexOf(threeCards[i]),
          1,
          game.deck[nextCardPos++]
        )
      }
      const updatedPlayer = await User.update(
        {sets: player.sets + 1},
        {where: {id: player.id}, returning: true, plain: true}
      )
      const updatedGame = await Game.update(
        {cardsOnTheBoard, nextCardPos, sets: game.sets + 1},
        {where: {id: game.id}, returning: true, plain: true}
      )
      if (nextCardPos === CARDS_IN_DECK) {
        console.log(nextCardPos)
        res.status(200).json({gg: 'no cards left', player: updatedPlayer[1]})
      } else {
        //	res.status(201).json({game: updatedGame[1], player: updatedPlayer[1]})
        res.status(201).json(updatedGame[1])
      }
    } else res.status(200).send(game)
  } catch (err) {
    next(err)
  }
})

router.put('/:gId/stumped', async (req, res, next) => {
  try {
    const game = await Game.findByPk(+req.params.gId)
    let {cardsOnTheBoard, nextCardPos, deck} = game
    for (let i = 0; i < 3; i++) {
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
