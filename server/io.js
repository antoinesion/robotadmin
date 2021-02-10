const socket = require('socket.io');
const dotenv = require('dotenv');
const Employee = require('../models/Employee');
const socketIDs = {};

dotenv.config();

async function verify(id) {
  console.log(id);
  try {
    const employee = await Employee.findOne({ id: id });
    if (employee) {
      return {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
      };
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export default function () {
  this.nuxt.hook('listen', async (server, { host, port }) => {
    let io = socket(server);
    console.log(`socket.io server listening on ${host}:${port}`);

    io.on('connection', (socket) => {
      switch (socket.handshake.address) {
        case process.env.JETSON_IP_ADDRESS:
          socketIDs['jetson'] = socket.id;
          console.log('new connection from jetson');

          socket.on('detected', () => {
            socket.broadcast.to(socketIDs['raspberry']).emit('detected');
          });
          break;
        case process.env.RASPBERRY_IP_ADDRESS:
          socketIDs['raspberry'] = socket.id;
          console.log('new connection from raspberry');

          socket.on('identify', async (data) => {
            socket.emit('employee', await verify(data.id));
          });

          socket.on('alarm', () => {
            console.log('alarm!');
          });
          break;
        default:
          console.log(
            `new connection from unknown IP ${socket.handshake.address}`
          );
      }
    });
  });
}
