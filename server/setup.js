const io = require('./io');

export default function () {
  this.nuxt.hook('listen', async (server, { port }) => {
    io.setup(server, port);
  });
}
