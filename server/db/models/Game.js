const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  code: {
    type: Sequelize.STRING
  },
  winner: {
    type: Sequelize.JSON
  },
  dealtCards: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  drawPile: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  discardPile: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
})
module.exports = Game
