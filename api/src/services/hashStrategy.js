import crypto from "crypto";
import { encodeBase62 } from "../utils/base62.js";

export async function generateHashCode(url) {
  const hash = crypto
    .createHash("sha256")
    .update(url + Date.now())
    .digest("hex");

  const numeric = parseInt(hash.substring(0, 12), 16);

  return encodeBase62(numeric);
}