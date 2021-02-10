const socket = require('socket.io');
var io;

function setup(server, port) {
  io = socket(server);
  console.log(`socket.io server listening on port ${port}`);

  // io.on
  io.on('connection', (socket) => {
    console.log('new connection');
    console.log(socket.handshake.address);
  });
}

module.exports = { setup, io };
