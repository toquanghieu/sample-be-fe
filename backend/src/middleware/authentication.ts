import type { Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../constants";

/**
 * TSOA authentication handler
 * Validates JWT token from Authorization header
 */
export async function expressAuthentication(
  request: Request,
  securityName: string,
  _scopes?: string[]
): Promise<{ userId: string }> {
  if (securityName === "jwt") {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    try {
      const decoded = jwt.verify(token, JWT_CONFIG.SECRET) as { userId: string };
      return { userId: decoded.userId };
    } catch {
      throw new Error("Invalid or expired token");
    }
  }

  throw new Error("Unknown security name");
}
