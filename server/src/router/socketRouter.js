// let users = [];
let bids = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
    });
    socket.on('sendBid', (data) => {
      console.log('data ===', data);

      bids.push(data);

      socket.to(data.itemId).emit('receiveBids', data);
    });
  });
};
