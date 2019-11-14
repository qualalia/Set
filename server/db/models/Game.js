const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  code: {
    type: Sequelize.STRING
  },
  winner: {
    type: Sequelize.JSON
  }
})
module.exports = Game
