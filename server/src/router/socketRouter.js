module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('newBid', (data) => {
      console.log('data ===', data);
      io.emit('bidData', data);
    });
    // socket.on("disconnect", () => {
    //     users = users.filter(x => x.id !== socket.id)
    //     socket.broadcast.emit("setUsers", users)
    // })
  });
};
