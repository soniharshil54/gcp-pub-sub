const { PubSub } = require('@google-cloud/pubsub');
require('dotenv').config();

const UtilService = require('./services/util');

let pubSubClient = new PubSub(
    {
        projectId: process.env.GOOGLE_PROJECT_ID,
        credentials: JSON.parse(UtilService.decodeBase64(process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE_64)),
    }
);

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
const messageData = 'Hello, Pub/Sub 2!';

publishMessage(topicName, messageData);
