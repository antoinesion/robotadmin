const socket = require('socket.io');
const dotenv = require('dotenv');
const Employee = require('../models/Employee');
const socketIDs = {};

dotenv.config();

async function verify(id) {
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

          socket.on('disconnect', () => {
            console.log('jetson disconnected');
          });
          break;
        case process.env.RASPBERRY_IP_ADDRESS:
          console.log('new connection from raspberry');

          socket.on('waiting', () => {
            console.log(`changing raspberry id to: ${socket.id}`);
            socketIDs['raspberry'] = socket.id;
          });

          socket.on('identify', async (data) => {
            console.log(`changing raspberry id to: ${socket.id}`);
            socketIDs['raspberry'] = socket.id;

            const employee = await verify(data.id);
            socket.emit('employee', employee);

            if (employee) {
              socket.broadcast.to(socketIDs['jetson']).emit('identified');
            }
          });

          socket.on('alarm', () => {
            console.log('alarm!');
          });

          socket.on('disconnect', () => {
            socketIDs['raspberry'];
            console.log(`raspberry disconnected`);
          });
          break;
        case process.env.SERVER_IP_ADDRESS:
          socketIDs['server'] = socket.id;
          console.log('new connection from server');

          socket.on('position', (data) => {
            console.log(data);
          });

          socket.on('disconnect', () => {
            console.log('server disconnected');
          });
          break;
        default:
          console.log(
            `/!\\ new connection from unknown IP ${socket.handshake.address}`
          );
      }
    });
  });
}
