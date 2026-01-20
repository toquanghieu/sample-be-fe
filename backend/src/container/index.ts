import "reflect-metadata";
import { container } from "tsyringe";

// Repositories
import { ShoeRepository, UserRepository } from "../repositories";
import type { IShoeRepository, IUserRepository } from "../interfaces";

// Services
import { ShoeService, AuthService } from "../services";
import type { IShoeService, IAuthService } from "../interfaces";

/**
 * Configure dependency injection container
 * Registers all interfaces with their implementations
 */
function configureContainer(): void {
  // Register repositories
  container.register<IShoeRepository>("IShoeRepository", {
    useClass: ShoeRepository,
  });
  container.register<IUserRepository>("IUserRepository", {
    useClass: UserRepository,
  });

  // Register services
  container.register<IShoeService>("IShoeService", {
    useClass: ShoeService,
  });
  container.register<IAuthService>("IAuthService", {
    useClass: AuthService,
  });
}

// Initialize container
configureContainer();

export { container };
