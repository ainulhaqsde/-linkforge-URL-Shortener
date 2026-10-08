import dotenv from "dotenv";

dotenv.config();

import { redisClient } from "./redis.js";
import { processBatch } from "./processor.js";
import { logger } from "./logger.js";
import { pool } from "./db.js";

const STREAM_NAME =
  process.env.REDIS_STREAM_NAME || "click_events";

const GROUP_NAME =
  process.env.REDIS_CONSUMER_GROUP ||
  "analytics-group";

const CONSUMER_NAME =
  `consumer-${Math.random().toString(36).substring(2, 8)}`;

let running = true;

async function createConsumerGroup() {
  try {
    await redisClient.xGroupCreate(
      STREAM_NAME,
      GROUP_NAME,
      "0",
      {
        MKSTREAM: true
      }
    );

    logger.info("Consumer group created");
  } catch (err) {
    if (
      !err.message.includes("BUSYGROUP")
    ) {
      throw err;
    }

    logger.warn(
      "Consumer group already exists"
    );
  }
}

async function recoverPendingMessages() {
  try {
    const pending = await redisClient.xPending(
      STREAM_NAME,
      GROUP_NAME
    );

    logger.info(
      `Pending messages detected: ${pending.pending}`
    );
  } catch (err) {
    logger.error(
      "Pending recovery failed:",
      err
    );
  }
}

async function consumeMessages() {
  while (running) {
    try {
      const response =
        await redisClient.xReadGroup(
          GROUP_NAME,
          CONSUMER_NAME,
          {
            key: STREAM_NAME,
            id: ">"
          },
          {
            COUNT: 10,
            BLOCK: 5000
          }
        );

      if (!response) {
        continue;
      }

      const stream =
        response[0];

      const messages =
        stream.messages;

      try {
        await processBatch(messages);

        for (const msg of messages) {
          await redisClient.xAck(
            STREAM_NAME,
            GROUP_NAME,
            msg.id
          );
        }

        logger.info(
          `Acknowledged ${messages.length} messages`
        );
      } catch (err) {
        logger.error(
          "Processing failed, batch retained:",
          err
        );
      }
    } catch (err) {
      logger.error(
        "Worker consume loop error:",
        err
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );
    }
  }
}

async function gracefulShutdown() {
  logger.warn(
    "Worker shutting down gracefully..."
  );

  running = false;

  try {
    await redisClient.quit();

    await pool.end();

    logger.info(
      "Shutdown completed"
    );

    process.exit(0);
  } catch (err) {
    logger.error(
      "Shutdown failed:",
      err
    );

    process.exit(1);
  }
}

process.on(
  "SIGINT",
  gracefulShutdown
);

process.on(
  "SIGTERM",
  gracefulShutdown
);

async function startWorker() {
  try {
    logger.info(
      "Starting analytics worker..."
    );

    await createConsumerGroup();

    await recoverPendingMessages();

    await consumeMessages();
  } catch (err) {
    logger.error(
      "Worker startup failed:",
      err
    );

    process.exit(1);
  }
}

startWorker();