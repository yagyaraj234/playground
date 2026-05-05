import { redisClient } from "./redis";

// Subscribe to one or more channels
redisClient.subscribe("first_channel", (err, count) => {
  if (err) {
    console.error("Failed to subscribe:", err.message);
  } else {
    console.log(
      `Subscribed successfully! Currently listening to ${count} channels.`,
    );
  }
});

// Listen for messages
redisClient.on("message", (channel, message) => {
  console.log(`Received message from ${channel}: ${message}`);
});
