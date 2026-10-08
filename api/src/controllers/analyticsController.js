import { getAnalytics } from "../services/analyticsService.js";

export async function analytics(req, res, next) {
  try {
    const data = await getAnalytics(req.params.shortCode);

    res.json(data);
  } catch (err) {
    next(err);
  }
}