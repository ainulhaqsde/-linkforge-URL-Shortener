import app from "./app.js";
import { env } from "./config/env.js";

const server = app.listen(env.PORT, () => {
  console.log(`API running on port ${env.PORT}`);
});

process.on("SIGINT", () => {
  console.log("Graceful shutdown");

  server.close(() => {
    process.exit(0);
  });
});