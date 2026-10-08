import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      return Math.min(retries * 100, 3000);
    }
  }
});

redisClient.on("connect", () => {
  console.log("Worker connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis Worker Error:", err);
});

await redisClient.connect();