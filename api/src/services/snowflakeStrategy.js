import { encodeBase62 } from "../utils/base62.js";
import { env } from "../config/env.js";

let sequence = 0;
let lastTimestamp = -1;

function timestamp() {
  return Date.now();
}

export function generateSnowflakeId() {
  let current = timestamp();

  if (current === lastTimestamp) {
    sequence = (sequence + 1) & 4095;

    if (sequence === 0) {
      while (current <= lastTimestamp) {
        current = timestamp();
      }
    }
  } else {
    sequence = 0;
  }

  lastTimestamp = current;

  const snowflake =
    (BigInt(current) << 22n) |
    (BigInt(env.NODE_ID) << 12n) |
    BigInt(sequence);

  return encodeBase62(Number(snowflake % BigInt(Number.MAX_SAFE_INTEGER)));
}