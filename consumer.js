// Use the advanced messaging queue protocol
const amqp = require('amqplib');

connect();

// Create TCP connection to server
async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');

    // Create channel
    const channel = await connection.createChannel();

    // Create queue
    const result = await channel.assertQueue('jobs');

    // Consume message
    channel.consume('jobs', (msg) => {
      const parsedMsg = JSON.parse(msg.content.toString());
      console.log(`Received job number is ${parsedMsg.number}`);
    });

    // Acknowledge message to clear from queue
    channel.ack(msg);

    console.log('Waiting form messages...');
  } catch (ex) {
    console.error(ex);
  }
}
