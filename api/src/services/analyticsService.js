import { pool } from "../config/db.js";

export async function getAnalytics(shortCode) {
  const totalResult = await pool.query(
    `
    SELECT SUM(clicks) AS total
    FROM analytics_hourly
    WHERE short_code = $1
  `,
    [shortCode]
  );

  const historyResult = await pool.query(
    `
    SELECT hour_bucket, clicks
    FROM analytics_hourly
    WHERE short_code = $1
    ORDER BY hour_bucket ASC
  `,
    [shortCode]
  );

  return {
    total_clicks: parseInt(totalResult.rows[0].total || 0),
    history: historyResult.rows
  };
}