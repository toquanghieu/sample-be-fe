import { inject, injectable } from "tsyringe";
import type { IShoeService } from "../interfaces/service/IShoeService";
import type { IShoeRepository } from "../interfaces/repository/IShoeRepository";
import type { CreateShoeDTO } from "../dto/shoe.dto";
import type { Shoe } from "../types/entities/Shoe";
import type { ShoeResponse } from "../types/responses/ShoeResponse";

/**
 * Service implementation for Shoe business logic
 * Uses dependency injection for repository
 */
@injectable()
export class ShoeService implements IShoeService {
  constructor(
    @inject("IShoeRepository") private shoeRepository: IShoeRepository
  ) {}

  /**
   * Maps a Shoe entity to ShoeResponse DTO
   */
  private mapToResponse(shoe: Shoe): ShoeResponse {
    return {
      id: shoe.id,
      name: shoe.name,
      brand: shoe.brand,
    };
  }

  async getAllShoes(): Promise<ShoeResponse[]> {
    const shoes = await this.shoeRepository.findAll();
    return shoes.map((shoe) => this.mapToResponse(shoe));
  }

  async getShoeById(id: string): Promise<ShoeResponse | null> {
    const shoe = await this.shoeRepository.findById(id);
    if (!shoe) {
      return null;
    }
    return this.mapToResponse(shoe);
  }

  async createShoe(data: CreateShoeDTO): Promise<ShoeResponse> {
    const shoe = await this.shoeRepository.create({
      name: data.name,
      brand: data.brand,
    });
    return this.mapToResponse(shoe);
  }

  async deleteShoe(id: string): Promise<boolean> {
    const deletedShoe = await this.shoeRepository.delete(id);
    return deletedShoe !== null;
  }
}
