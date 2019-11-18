const User = require('./User')
const Game = require('./Game')
const GamePlayer = require('./GamePlayer.js')
//const Card = require('./Card')
//const Deck = require('./Deck')

User.belongsToMany(Game, {through: 'GamePlayers'})
Game.belongsToMany(User, {through: 'GamePlayers'})

/* Deck.belongsTo(Game)
 * Game.hasOne(Deck)
 *  */
/*Deck.hasMany(Card)
   Card.belongsTo(Deck)*/

module.exports = {
  User,
  Game,
  GamePlayer
  //  Deck
  //  Card
}
