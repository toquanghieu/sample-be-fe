import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma client instance
 * Ensures a single database connection throughout the application
 */
const prisma = new PrismaClient();

export { prisma };
