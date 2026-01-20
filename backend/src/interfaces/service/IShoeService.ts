import type { CreateShoeDTO } from "../../dto/shoe.dto";
import type { ShoeResponse } from "../../types/responses/ShoeResponse";

/**
 * Service interface for Shoe business logic
 */
export interface IShoeService {
  /**
   * Get all shoes
   */
  getAllShoes(): Promise<ShoeResponse[]>;

  /**
   * Get a shoe by ID
   */
  getShoeById(id: string): Promise<ShoeResponse | null>;

  /**
   * Create a new shoe
   */
  createShoe(data: CreateShoeDTO): Promise<ShoeResponse>;

  /**
   * Delete a shoe by ID
   * Returns true if deleted, false if not found
   */
  deleteShoe(id: string): Promise<boolean>;
}
