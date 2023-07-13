const { PubSub } = require('@google-cloud/pubsub');

// Creates a client
const pubSubClient = new PubSub();

async function subscribe(topicName, subscriptionName) {
  const subscription = pubSubClient.subscription(subscriptionName);

  subscription.on('message', (message) => {
    console.log('Received message:', message.data.toString());
    message.ack();
  });

  subscription.on('error', (error) => {
    console.error('Error:', error);
  });

  // Start listening for messages
  await subscription.create();

  console.log(`Listening for messages on ${subscriptionName}...`);
}

const topicName = 'your-topic-name';
const subscriptionName = 'your-subscription-name';

subscribe(topicName, subscriptionName);
