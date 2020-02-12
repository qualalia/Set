const rooms = []
let next = 0
const getRoom = sId => {
  for (let i = 0; i < rooms.length; i++)
    rooms[i].find(room => {
      room.players.find(player => player.sockedId === sId)
    })
}

function createSockets(io) {
  io.on('connection', socket => {
    console.log(`New player: ${socket.id}.`)

    /* io.on('connection', socket => {
     *   //socket.join(`room ${next}`)
     *   console.log(`Player ${socket.id} has joined room ${next}.`)
     *   next++
     *   // check for room availability
     *   if (currentRoom.isFull) {
       // make new room
     *   }
     * }) */

    socket.on('disconnect', () => {
      //io.to(`room ${getRoom(socket.id)}`).emit('disconnect-player', socket.id) // add 'player has disconnected' to front-end

      console.log(`Player ${socket.id} has disconnected.`)
    })
  })
}

module.exports = {createSockets}
