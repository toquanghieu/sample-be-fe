/**
 * Default allowed origins for development
 */
const DEFAULT_ORIGINS = [
  "http://localhost:5173",
];

/**
 * Parse CORS origins from environment variable
 * Supports comma-separated list of origins
 * @example CORS_ORIGINS="http://localhost:5173,http://localhost:3000,https://myapp.com"
 */
function parseCorsOrigins(): string | string[] {
  const originsEnv = process.env.CORS_ORIGINS;

  if (!originsEnv) {
    // Default to common development ports
    return DEFAULT_ORIGINS;
  }

  // Split by comma and trim whitespace
  const origins = originsEnv.split(",").map((origin) => origin.trim());

  // If only one origin, return as string
  if (origins.length === 1) {
    return origins[0];
  }

  return origins;
}

/**
 * Get CORS configuration
 * Called at runtime to ensure env vars are loaded
 */
export function getCorsConfig() {
  return {
    /**
     * Allowed origins - can be a single origin or array of origins
     * Set via CORS_ORIGINS env variable (comma-separated)
     */
    ORIGINS: parseCorsOrigins(),

    /**
     * Allow credentials (cookies, authorization headers)
     */
    CREDENTIALS: process.env.CORS_CREDENTIALS !== "false",

    /**
     * Allowed HTTP methods
     */
    METHODS: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"] as string[],

    /**
     * Allowed headers
     */
    ALLOWED_HEADERS: ["Content-Type", "Authorization", "X-Requested-With"] as string[],

    /**
     * Exposed headers (headers that can be accessed by the client)
     */
    EXPOSED_HEADERS: ["Content-Length", "X-Request-Id"] as string[],

    /**
     * Max age for preflight cache (in seconds)
     */
    MAX_AGE: 86400, // 24 hours
  };
}

/**
 * @deprecated Use getCorsConfig() instead for runtime env loading
 */
export const CORS_CONFIG = {
  get ORIGINS() { return getCorsConfig().ORIGINS; },
  get CREDENTIALS() { return getCorsConfig().CREDENTIALS; },
  get METHODS() { return getCorsConfig().METHODS; },
  get ALLOWED_HEADERS() { return getCorsConfig().ALLOWED_HEADERS; },
  get EXPOSED_HEADERS() { return getCorsConfig().EXPOSED_HEADERS; },
  get MAX_AGE() { return getCorsConfig().MAX_AGE; },
};
