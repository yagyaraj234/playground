import { Redis } from "ioredis";

import { redisClient } from "./redis";

const channels = ["first_channel", "second_channel"];

// Subscribe to one or more channels
redisClient.subscribe(...channels, (err, count) => {
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

const pusblisher = new Redis();

async function publish() {
  for (let i = 0; i < 10; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await pusblisher.publish(
      "first_channel",
      JSON.stringify({
        name: "shoeb",
        age: i,
      }),
    );
    await pusblisher.publish(
      "second_channel",
      JSON.stringify({
        name: "second_shoeb",
        age: i,
      }),
    );
  }
}

publish();
