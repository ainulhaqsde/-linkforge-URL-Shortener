import { pool } from "./db.js";
import { logger } from "./logger.js";

export async function processBatch(messages) {
  if (!messages.length) return;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const aggregationMap = new Map();

    for (const message of messages) {
      const fields = message.message;

      const shortCode = fields.short_code;

      const timestamp = new Date(fields.timestamp);

      const hourBucket = new Date(timestamp);

      hourBucket.setMinutes(0, 0, 0);

      const key = `${shortCode}_${hourBucket.toISOString()}`;

      aggregationMap.set(
        key,
        (aggregationMap.get(key) || 0) + 1
      );
    }

    for (const [key, clicks] of aggregationMap.entries()) {
      const [shortCode, hourBucket] = key.split("_");

      await client.query(
        `
        INSERT INTO analytics_hourly (
          short_code,
          hour_bucket,
          clicks
        )
        VALUES ($1, $2, $3)
        ON CONFLICT (short_code, hour_bucket)
        DO UPDATE SET
          clicks = analytics_hourly.clicks + EXCLUDED.clicks
      `,
        [shortCode, hourBucket, clicks]
      );

      await client.query(
        `
        UPDATE urls
        SET click_count = click_count + $1
        WHERE short_code = $2
      `,
        [clicks, shortCode]
      );
    }

    await client.query("COMMIT");

    logger.info(
      `Processed batch successfully: ${messages.length} events`
    );
  } catch (err) {
    await client.query("ROLLBACK");

    logger.error("Batch processing failed:", err);

    throw err;
  } finally {
    client.release();
  }
}