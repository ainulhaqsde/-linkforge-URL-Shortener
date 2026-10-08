import { generateHashCode } from "../services/hashStrategy.js";
import { generateSnowflakeId } from "../services/snowflakeStrategy.js";
import { saveUrl } from "../services/urlService.js";
import { env } from "../config/env.js";

export async function shortenUrl(req, res, next) {
  try {
    const { url, strategy, expires_at, custom_code } = req.body;

    let shortCode = custom_code;

    if (!shortCode && strategy === "hash") {
      shortCode = await generateHashCode(url);
    } else if (!shortCode) {
      shortCode = generateSnowflakeId();
    }

    await saveUrl({
      short_code: shortCode,
      original_url: url,
      strategy,
      expires_at
    });

    res.status(201).json({
      success: true,
      short_url: `${env.BASE_URL}/${shortCode}`,
      short_code: shortCode,
      strategy
    });
  } catch (err) {
    if (err.code === "23505") return res.status(409).json({success:false,message:"Short code already exists. Try another alias."});
    next(err);
  }
}