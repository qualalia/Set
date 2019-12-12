const User = require('./User')
const Game = require('./Game')
const GamePlayer = require('./GamePlayer.js')

User.belongsToMany(Game, {through: GamePlayer})
Game.belongsToMany(User, {through: GamePlayer})

module.exports = {
  User,
  Game,
  GamePlayer
}
