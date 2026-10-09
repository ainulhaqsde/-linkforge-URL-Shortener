
import { getCache, setCache } from "../services/cacheService.js";
import { getUrlByCode } from "../services/urlService.js";
import { publishClickEvent } from "../services/analyticsPublisher.js";

export async function redirectUrl(req, res, next) {
  try {
    const { shortCode } = req.params;

    // Check Redis cache first
    const cached = await getCache(shortCode);

    if (cached) {
      res.setHeader("X-Cache-Status", "HIT");

      // Publish click event before redirecting
      await publishClickEvent(shortCode, req);

      return res.redirect(cached);
    }

    // Look up URL in PostgreSQL
    const data = await getUrlByCode(shortCode);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found"
      });
    }

    // Cache non-expiring URLs
    if (!data.expires_at) {
      await setCache(shortCode, data.original_url);
    }

    res.setHeader("X-Cache-Status", "MISS");

    // Publish click event before redirecting
    await publishClickEvent(shortCode, req);

    return res.redirect(data.original_url);
  } catch (err) {
    next(err);
  }
}
