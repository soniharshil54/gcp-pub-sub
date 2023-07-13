const { PubSub } = require('@google-cloud/pubsub');

// Creates a client
const pubSubClient = new PubSub();

async function publishMessage(topicName, data) {
  const dataBuffer = Buffer.from(data);

  try {
    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
}

const topicName = 'your-topic-name';
const messageData = 'Hello, Pub/Sub!';

publishMessage(topicName, messageData);
