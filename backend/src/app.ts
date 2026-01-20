import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

// Import container to initialize DI
import "./container";
import { CORS_CONFIG } from "./constants";

/**
 * Create and configure Express application
 */
function createApp(): Express {
  const app = express();

  // CORS configuration from environment
  app.use(
    cors({
      origin: CORS_CONFIG.ORIGINS,
      credentials: CORS_CONFIG.CREDENTIALS,
      methods: CORS_CONFIG.METHODS,
      allowedHeaders: CORS_CONFIG.ALLOWED_HEADERS,
      exposedHeaders: CORS_CONFIG.EXPOSED_HEADERS,
      maxAge: CORS_CONFIG.MAX_AGE,
    })
  );

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
}

/**
 * Configure routes after TSOA generates them
 */
async function configureRoutes(app: Express): Promise<void> {
  // Import generated routes (will be available after tsoa generates them)
  const { RegisterRoutes } = await import("./generated/routes");
  RegisterRoutes(app);

  // Swagger documentation
  try {
    const swaggerDocument = await import("./generated/swagger.json");
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch {
    console.log("Swagger documentation not available yet. Run npm run tsoa:generate");
  }

  // Health check endpoint
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: "Not found" });
  });

  // Error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Error:", err.message);
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  });
}

export { createApp, configureRoutes };
