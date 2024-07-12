const { Kafka } = require('kafkajs');
const Notification = require('../models/Notification')

const kafka = new Kafka({
  clientId: 'notification-system',
  brokers: ["kafka:29092"],
  retry: {
    initialRetryTime: 100,
    retries: 20
  }
});

let producer = null;
const topicName = "MESSAGES";

const createProducer= async ()=> {
    if (producer) return producer;
  
    const _producer = kafka.producer();
    await _producer.connect();
    producer = _producer;
    return producer;
}

const createConsumer = async(group)=>{
  console.log("Consumer is running..");
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();
  await consumer.subscribe({ topic: topicName, fromBeginning: true });
  return consumer;
}

const produceMessage = async (message)=>{
  console.log("in producing mesage")
  const producer = await createProducer();
  console.log("now producing message: ",message)
  await producer.send({
    messages: [{ key: "message", value: JSON.stringify(message) }
  ],
    topic: topicName,
  });
}

const startMessageConsumer = async ()=>{
  const consumer = await createConsumer("default");
  console.log("waiting for messages")
  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ message, pause }) => {
      if (!message) return;
      try {
        const data = JSON.parse(message.value.toString());
        const notification = new Notification({ userId:data.userId, message: data.message });
        await notification.save();
        console.log("notification saved to database");
      } catch (err) {
        console.log("Something is wrong:",err);
        pause();
        setTimeout(() => {
          consumer.resume([{ topic: topicName }]);
        }, 60 * 1000);
      }
    },
  });
}

module.exports = { kafka, produceMessage, createConsumer, startMessageConsumer};
