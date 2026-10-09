
import { isValidUrl } from "../utils/validation.js";

export function validateShortenRequest(req, res, next) {
  const { url, strategy = "snowflake", expires_at, custom_code } = req.body || {};

  if (!isValidUrl(url)) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid HTTP or HTTPS URL (max 2048 characters)."
    });
  }

  if (!["hash", "snowflake"].includes(strategy)) {
    return res.status(400).json({
      success: false,
      message: "Invalid strategy"
    });
  }

  // Custom code is optional
  if (custom_code !== undefined && custom_code !== null && custom_code !== "") {
    if (
      typeof custom_code !== "string" ||
      !/^[a-zA-Z0-9_-]{3,20}$/.test(custom_code) ||
      ["api", "health", "analytics"].includes(custom_code.toLowerCase())
    ) {
      return res.status(400).json({
        success: false,
        message: "Custom code must be 3–20 letters, numbers, underscores or hyphens."
      });
    }
  }

  if (
    expires_at !== undefined &&
    expires_at !== null &&
    (
      typeof expires_at !== "string" ||
      !Number.isFinite(Date.parse(expires_at)) ||
      Date.parse(expires_at) <= Date.now()
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "Expiration must be a future date."
    });
  }

  req.body.strategy = strategy;
  next();
}
