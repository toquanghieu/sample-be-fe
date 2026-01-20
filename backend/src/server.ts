// Load environment variables FIRST before any other imports
import "./config/env";

import "reflect-metadata";
import { createApp, configureRoutes } from "./app";

const PORT = process.env.PORT ?? 3000;

/**
 * Bootstrap and start the server
 */
async function bootstrap(): Promise<void> {
  const app = createApp();

  await configureRoutes(app);

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
    console.log(`❤️  Health check: http://localhost:${PORT}/health`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
