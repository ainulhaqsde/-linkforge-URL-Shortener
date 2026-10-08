import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

pool.on("connect", () => {
  console.log("Worker connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("PostgreSQL Worker Error:", err);
});