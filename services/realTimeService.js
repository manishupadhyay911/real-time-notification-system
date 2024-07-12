const socketIO = require('socket.io');
const { createConsumer } = require('../config/kafka');

let io;
const topicName = "MESSAGES";
const initSocket =  async (server) => {
  io = socketIO(server);
  io.on('connection', async (socket) => {
    console.log('A user connected', socket.id);
    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
    });
  });
  
  const consumer = await createConsumer("websockets");
  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ message, pause }) => {
      if (!message) return;
      try {
        console.log("message: ",message.value.toString());
        const data = JSON.parse(message.value.toString());
        io.emit('notification', data.message);
      } catch (err) {
        console.log("Something is wrong:",err);
        pause();
        setTimeout(() => {
          consumer.resume([{ topic: topicName }]);
        }, 60 * 1000);
      }
    },
  });

};

module.exports = { initSocket };
