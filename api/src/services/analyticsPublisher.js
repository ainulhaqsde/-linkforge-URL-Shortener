import { redisClient } from "../config/redis.js";
import { env } from "../config/env.js";

export async function publishClickEvent(shortCode, req) {
  try {
    await redisClient.xAdd(env.STREAM_NAME, "*", {
      short_code: shortCode,
      timestamp: new Date().toISOString(),
      user_agent: req.headers["user-agent"] || "unknown",
      ip: req.ip
    });
  } catch (err) {
    console.error("Analytics publish failed:", err);
  }
}