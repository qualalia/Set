const faker = require('faker')
const {green, red} = require('chalk')
const customId = require('custom-id')
const {db, User, Game, Deck} = require('../server/db')

const TOTAL_SEEDS = 100
//let cardsInDeck = []
/*for (let i = 0; i < 81; i++)
  cardsInDeck.push({
    value: [i % 3],
    type: Math.floor(i / 3) % 3,
    fill: Math.floor(i / 9) % 3,
    color: Math.floor(i / 27),
  })
console.log(cardsInDeck)*/

let dummyUsers = [
  {
    username: 'linda',
    email: 'linda@linda.com',
    password: '12345',
    status: 'admin',
    isOnline: true
  }
]
let dummyGames = []
for (let i = 0; i < TOTAL_SEEDS; i++) {
  dummyUsers.push({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: '123',
    status: ['admin', 'user', 'guest'][Math.round(Math.random() - 0.5)],
    rating: Math.floor(Math.random() * 100),
    googleId: faker.random.uuid(),
    isOnline: Math.floor(Math.random() * 2)
  })
  dummyGames.push({
    code: customId({}),
    winner: dummyUsers[Math.floor(Math.random() * TOTAL_SEEDS)]
  })
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const seededUsers = await Promise.all(
    dummyUsers.map(user => User.create(user))
  )
  const seededGames = await Promise.all(
    dummyGames.map(game => Game.create(game))
  )
  /*  const seededCards = await Promise.all(
    cardsInDeck.map(card => Card.create(card))
  )*/
  /*  const seededDeck = await Deck.create()
  Deck.setCards(seededCards) */

  // Associations
  for (let i = 0; i < 20; i++) {
    const usersOnGame = Math.floor(Math.random() * 4)
    for (let j = 0; j < usersOnGame; j++) {
      const currentUser = seededUsers[Math.floor(Math.random() * TOTAL_SEEDS)]
      await currentUser.addGame(seededGames[i])
      await seededGames[i].addUser(currentUser)
    }
  }
  console.log('Now 20 games have up to 4 players!')
  // Complete seed
  console.log(
    `Database seeded with ${seededUsers.length} and ${
      seededGames.length
    } games.`
  )
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.log(red('error seeding'))
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
