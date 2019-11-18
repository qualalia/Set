const Sequelize = require('sequelize')
const db = require('../db')

const GamePlayer = db.define('GamePlayer', {
  sets: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = GamePlayer
