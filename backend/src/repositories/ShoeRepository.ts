import { injectable } from "tsyringe";
import { BaseRepository } from "./base/BaseRepository";
import type { IShoeRepository } from "../interfaces/repository/IShoeRepository";
import type { Shoe, CreateShoeData } from "../types/entities/Shoe";

/**
 * Prisma implementation of IShoeRepository
 * Extends BaseRepository for common CRUD operations
 */
@injectable()
export class ShoeRepository
  extends BaseRepository<Shoe, CreateShoeData>
  implements IShoeRepository
{
  protected get model() {
    return this.prisma.shoe;
  }

  /**
   * Find shoes by brand
   */
  async findByBrand(brand: string): Promise<Shoe[]> {
    return this.prisma.shoe.findMany({
      where: { brand },
      orderBy: this.defaultOrderBy,
    });
  }
}
