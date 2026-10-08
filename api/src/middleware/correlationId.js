import { randomUUID } from "crypto";

export function correlationId(req, res, next) {
  req.correlationId = randomUUID();
  res.setHeader("X-Correlation-Id", req.correlationId);
  next();
}