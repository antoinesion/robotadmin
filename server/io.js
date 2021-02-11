const socket = require('socket.io');
const dotenv = require('dotenv');
const Employee = require('../models/Employee');
const Log = require('../models/Log');
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

async function registerLog(content, type) {
  const log = new Log({
    content,
    type,
  });
  await log.save();
  return {
    _id: log._id,
    content: log.content,
    type: log.type,
    date: log.date,
  };
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

          socket.on('detected', async () => {
            io.emit(
              'log',
              await registerLog('Person detected near the robot', 'warning')
            );
            socket.broadcast.to(socketIDs['raspberry']).emit('detected');
          });

          socket.on('disconnect', () => {
            console.log('jetson disconnected');
          });
          break;
        case process.env.RASPBERRY_IP_ADDRESS:
          console.log('new connection from raspberry');

          socket.on('waiting', () => {
            console.log(`switching raspberry id to: ${socket.id}`);
            socketIDs['raspberry'] = socket.id;
          });

          socket.on('identify', async (data) => {
            const employee = await verify(data.id);
            socket.emit('employee', employee);

            if (employee) {
              io.emit(
                'log',
                await registerLog(
                  `The detected person has been identified: ${employee.firstName} ${employee.lastName}`,
                  'info'
                )
              );
              socket.broadcast.to(socketIDs['jetson']).emit('identified');
            }
          });

          socket.on('alarm', async () => {
            io.emit(
              'log',
              await registerLog(
                'An intruder has been detected! Dialing 911...',
                'alert'
              )
            );
          });

          socket.on('disconnect', () => {
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
            `new connection from client IP ${socket.handshake.address}`
          );
      }
    });
  });
}
