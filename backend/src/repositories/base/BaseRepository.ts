import type { IBaseRepository } from "../../interfaces/repository/IBaseRepository";
import { prisma } from "../../database/prisma";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Abstract base repository with common CRUD operations
 * Uses Prisma as the underlying ORM
 * @template T - Entity type
 * @template CreateDTO - DTO for creating entity
 */
export abstract class BaseRepository<T, CreateDTO> implements IBaseRepository<T, CreateDTO> {
  /**
   * The Prisma model delegate (e.g., prisma.shoe, prisma.user)
   * Using 'any' to accommodate Prisma's complex generic types
   */
  protected abstract get model(): any;

  /**
   * Default ordering for findAll queries
   */
  protected get defaultOrderBy(): object {
    return { createdAt: "desc" };
  }

  /**
   * Get the Prisma client instance
   */
  protected get prisma() {
    return prisma;
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany({
      orderBy: this.defaultOrderBy,
    });
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({
      where: { id },
    });
  }

  async create(data: CreateDTO): Promise<T> {
    return this.model.create({
      data,
    });
  }

  async update(id: string, data: Partial<CreateDTO>): Promise<T | null> {
    const entity = await this.findById(id);
    if (!entity) {
      return null;
    }

    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<T | null> {
    const entity = await this.findById(id);
    if (!entity) {
      return null;
    }

    return this.model.delete({
      where: { id },
    });
  }
}
