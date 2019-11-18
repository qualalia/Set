module.exports = io => {
  io.on('connection', socket => {
    console.log(`User ${socket.id} has connected.`)

    socket.on('disconnect', () => {
      console.log(`User ${socket.id} has disconnected.`)
    })
  })
}
