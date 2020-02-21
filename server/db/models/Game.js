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
  nextCardPos: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cardsLeft: {
    type: Sequelize.INTEGER
  },
  gg: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  foundSet: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }
  /*  sets: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }*/
})
module.exports = Game
