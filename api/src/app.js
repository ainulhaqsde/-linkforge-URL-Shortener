import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

import shortenRoutes from "./routes/shorten.js";
import redirectRoutes from "./routes/redirect.js";
import analyticsRoutes from "./routes/analytics.js";
import healthRoutes from "./routes/health.js";

import { limiter } from "./middleware/rateLimiter.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { correlationId } from "./middleware/correlationId.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use(requestLogger);
app.use(correlationId);
app.use(limiter);

app.use("/health", healthRoutes);

app.use("/api/shorten", shortenRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/", redirectRoutes);

app.use(errorHandler);

export default app;