// Use the advanced messaging queue protocol
const amqp = require('amqplib');

// Get the jobNumber automatically from the command line
const msg = { jobNumber: process.argv[2] };

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
    channel.sendToQueue('jobs', Buffer.from(JSON.stringify(msg)));

    console.log(`job ${msg.jobNumber} has been sent successfully`);
  } catch (ex) {
    console.error(ex);
  }
}
