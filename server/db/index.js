const db = require('./db')

// register models
const {User, Game} = require('./models')

module.exports = {db, User, Game}
