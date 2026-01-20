/**
 * JWT configuration constants
 */
export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET ?? "your-super-secret-jwt-key-change-in-production",
  EXPIRES_IN: "24h",
} as const;

/**
 * Password hashing constants
 */
export const PASSWORD_CONFIG = {
  SALT_ROUNDS: 10,
} as const;
