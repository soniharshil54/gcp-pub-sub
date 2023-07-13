const { PubSub } = require('@google-cloud/pubsub');
require('dotenv').config();

const UtilService = require('./services/util');

let pubSubClient = new PubSub(
    {
        projectId: process.env.GOOGLE_PROJECT_ID,
        credentials: JSON.parse(UtilService.decodeBase64(process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE_64)),
    }
);

async function createTopicAndSubscribe(topicName, subscriptionName) {
  try {
    // Check if the topic already exists
    const [topicExists] = await pubSubClient.topic(topicName).exists();

    if (!topicExists) {
      // Create a new topic
      const [topic] = await pubSubClient.createTopic(topicName);
      console.log(`Topic ${topic.name} created.`);
    }

    // Create a subscription for the topic
    const [subscription] = await pubSubClient.topic(topicName).createSubscription(subscriptionName);
    console.log(`Subscription ${subscription.name} created.`);
    
    // Start listening for messages
    subscription.on('message', (message) => {
      console.log('Received message:', message.data.toString());
      message.ack();
    });

    subscription.on('error', (error) => {
      console.error('Error:', error);
    });

    console.log(`Listening for messages on ${subscription.name}...`);
  } catch (error) {
    console.error('Error creating topic/subscription:', error);
  }
}

const topicName = 'your-topic-name';
const subscriptionName = 'your-subscription-name-7';

createTopicAndSubscribe(topicName, subscriptionName);

