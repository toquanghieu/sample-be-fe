import { injectable } from "tsyringe";
import { BaseRepository } from "./base/BaseRepository";
import type { IUserRepository } from "../interfaces/repository/IUserRepository";
import type { User, CreateUserData } from "../types/entities/User";

/**
 * Prisma implementation of IUserRepository
 * Extends BaseRepository for common CRUD operations
 */
@injectable()
export class UserRepository
  extends BaseRepository<User, CreateUserData>
  implements IUserRepository
{
  protected get model() {
    return this.prisma.user;
  }

  /**
   * Find a user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
