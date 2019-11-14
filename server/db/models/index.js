const User = require('./User')
const Game = require('./Game')

User.belongsToMany(Game, {through: 'GamePlayers'})
Game.belongsToMany(User, {through: 'GamePlayers'})

module.exports = {
  User,
  Game
}
