import pg from "pg";
import { env } from "./env.js";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20
});

pool.on("error", (err) => {
  console.error("PostgreSQL Error:", err);
});