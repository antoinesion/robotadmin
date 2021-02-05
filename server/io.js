export default function (socket) {
  return Object.freeze({
    /* Just define the methods here */
    connected() {
      console.log('connection detected');
      return { status: 'ok' };
    },
  });
}
