import { pool } from "../config/db.js";
import { queries } from "../database/queries.js";

export async function saveUrl(data) {
  const values = [
    data.short_code,
    data.original_url,
    data.strategy,
    data.expires_at || null
  ];

  const result = await pool.query(queries.insertUrl, values);

  return result.rows[0];
}

export async function getUrlByCode(code) {
  const result = await pool.query(queries.getUrl, [code]);

  return result.rows[0];
}