// Use the advanced messaging queue protocol
const amqp = require('amqplib');

// Dummy message to be sent
const msg = { jobNumber: 13 };

connect();

// Create connection to server
async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');

    // Create channel
    const channel = await connection.createChannel();

    // Create queue
    const result = await channel.assertQueue('jobs');

    // Send message
    channel.sendToQueue('jobs', Bufferl.from(JSON.stringify(msg)));

    console.log(`job ${msq.jobNumber} has been sent successfully`);
  } catch (ex) {
    console.error(ex);
  }
}
