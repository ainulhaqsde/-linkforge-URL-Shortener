import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.API_PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  BASE_URL: process.env.BASE_URL,
  CACHE_TTL: parseInt(process.env.CACHE_TTL || "86400"),
  NODE_ID: parseInt(process.env.NODE_ID || "1"),
  STREAM_NAME: process.env.REDIS_STREAM_NAME || "click_events"
};