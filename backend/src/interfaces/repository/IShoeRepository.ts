import type { IBaseRepository } from "./IBaseRepository";
import type { Shoe, CreateShoeData } from "../../types/entities/Shoe";

/**
 * Repository interface for Shoe entity
 * Extends base repository with shoe-specific operations
 */
export interface IShoeRepository extends IBaseRepository<Shoe, CreateShoeData> {
  /**
   * Find shoes by brand
   */
  findByBrand(brand: string): Promise<Shoe[]>;
}
