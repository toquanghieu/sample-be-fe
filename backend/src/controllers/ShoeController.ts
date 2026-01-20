import {
  Controller,
  Get,
  Post,
  Delete,
  Route,
  Body,
  Path,
  SuccessResponse,
  Response,
  Tags,
  Security,
} from "tsoa";
import { inject, injectable } from "tsyringe";
import type { IShoeService } from "../interfaces/service/IShoeService";
import { CreateShoeDTO } from "../dto/shoe.dto";
import type { ShoeResponse } from "../types/responses/ShoeResponse";
import type { ErrorResponse } from "../types/responses/ErrorResponse";
import { validateDTO } from "../middleware/validation";

/**
 * TSOA Controller for Shoe endpoints
 * Handles HTTP requests and delegates to service layer
 * All endpoints require JWT authentication
 */
@Route("shoes")
@Tags("Shoes")
@Security("jwt")
@injectable()
export class ShoeController extends Controller {
  constructor(@inject("IShoeService") private shoeService: IShoeService) {
    super();
  }

  /**
   * Get all shoes
   * @returns Array of shoes
   */
  @Get()
  @SuccessResponse(200, "Success")
  public async getShoes(): Promise<ShoeResponse[]> {
    return this.shoeService.getAllShoes();
  }

  /**
   * Create a new shoe
   * @param requestBody The shoe data to create
   * @returns The created shoe
   */
  @Post()
  @SuccessResponse(201, "Created")
  @Response<ErrorResponse>(400, "Validation error")
  public async createShoe(
    @Body() requestBody: CreateShoeDTO
  ): Promise<ShoeResponse> {
    // Validate request body
    const validatedData = await validateDTO(CreateShoeDTO, requestBody);

    this.setStatus(201);
    return this.shoeService.createShoe(validatedData);
  }

  /**
   * Delete a shoe by ID
   * @param id The shoe ID to delete
   */
  @Delete("{id}")
  @SuccessResponse(204, "Deleted")
  @Response<ErrorResponse>(404, "Shoe not found")
  public async deleteShoe(@Path() id: string): Promise<void> {
    const deleted = await this.shoeService.deleteShoe(id);
    if (!deleted) {
      this.setStatus(404);
      throw new Error("Shoe not found");
    }
    this.setStatus(204);
  }
}
