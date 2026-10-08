import { redisClient } from "../config/redis.js";
import { env } from "../config/env.js";

export async function getCache(key) {
  return await redisClient.get(key);
}

export async function setCache(key, value) {
  await redisClient.set(key, value, {
    EX: env.CACHE_TTL
  });
}