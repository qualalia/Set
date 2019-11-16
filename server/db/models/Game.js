const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  code: {
    type: Sequelize.STRING
  },
  winner: {
    type: Sequelize.JSONB
  },
  deck: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  },
  cardsOnTheBoard: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  },
  clickedCards: {
    // keep track of who clicked what cards (dynamic)
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: []
  },
  nextCardPos: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})
module.exports = Game
