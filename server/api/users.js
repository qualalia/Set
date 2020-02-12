const router = require('express').Router()
const {User} = require('../db')
const customId = require('custom-id')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'username', 'rating', 'isOnline']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await User.findByPk(+req.params.id))
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const sessionID = req.sessionID
    res
      .status(200)
      .send(await User.create({username: `anon${sessionID.substring(3, 9)}`}))
  } catch (err) {
    next(err)
  }
})
