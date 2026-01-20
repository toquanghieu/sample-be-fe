import type { IBaseRepository } from "./IBaseRepository";
import type { User, CreateUserData } from "../../types/entities/User";

/**
 * Repository interface for User entity
 * Extends base repository with user-specific operations
 */
export interface IUserRepository extends IBaseRepository<User, CreateUserData> {
  /**
   * Find a user by email
   */
  findByEmail(email: string): Promise<User | null>;
}
