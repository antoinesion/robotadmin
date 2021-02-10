const socket = require('socket.io');
var io;

function setup(server, port) {
  io = socket(server);
  console.log(`socket.io server listening on port ${port}`);

  // io.on
  io.on('connection', (socket) => {
    console.log(`new connection from ${socket.handshake.address}`);
  });

  io.on('person_detected', () => {
    console.log('person_detected');
  });
}

module.exports = { setup, io };
