import {
  Controller,
  Post,
  Get,
  Route,
  Body,
  SuccessResponse,
  Response,
  Tags,
  Security,
  Request,
} from "tsoa";
import { inject, injectable } from "tsyringe";
import type { Request as ExpressRequest } from "express";
import type { IAuthService } from "../interfaces/service/IAuthService";
import { RegisterDTO, LoginDTO } from "../dto/auth.dto";
import type { AuthResponse, UserResponse } from "../types/responses/AuthResponse";
import type { ErrorResponse } from "../types/responses/ErrorResponse";
import { validateDTO } from "../middleware/validation";

/**
 * TSOA Controller for Authentication endpoints
 */
@Route("auth")
@Tags("Authentication")
@injectable()
export class AuthController extends Controller {
  constructor(@inject("IAuthService") private authService: IAuthService) {
    super();
  }

  /**
   * Register a new user
   * @param requestBody User registration data
   * @returns Auth response with user and token
   */
  @Post("register")
  @SuccessResponse(201, "Created")
  @Response<ErrorResponse>(400, "Validation error")
  public async register(
    @Body() requestBody: RegisterDTO
  ): Promise<AuthResponse> {
    // Validate request body
    const validatedData = await validateDTO(RegisterDTO, requestBody);

    try {
      this.setStatus(201);
      return await this.authService.register(validatedData);
    } catch (error) {
      this.setStatus(400);
      throw error;
    }
  }

  /**
   * Login user
   * @param requestBody User login credentials
   * @returns Auth response with user and token
   */
  @Post("login")
  @SuccessResponse(200, "Success")
  @Response<ErrorResponse>(400, "Validation error")
  @Response<ErrorResponse>(401, "Unauthorized")
  public async login(@Body() requestBody: LoginDTO): Promise<AuthResponse> {
    // Validate request body
    const validatedData = await validateDTO(LoginDTO, requestBody);

    try {
      return await this.authService.login(validatedData);
    } catch (error) {
      this.setStatus(401);
      throw error;
    }
  }

  /**
   * Get current authenticated user
   * @returns Current user data
   */
  @Get("me")
  @Security("jwt")
  @SuccessResponse(200, "Success")
  @Response<ErrorResponse>(401, "Unauthorized")
  public async getCurrentUser(
    @Request() request: ExpressRequest
  ): Promise<UserResponse> {
    const userId = (request as ExpressRequest & { user: { userId: string } }).user
      .userId;
    const user = await this.authService.getCurrentUser(userId);
    if (!user) {
      this.setStatus(401);
      throw new Error("User not found");
    }
    return user;
  }
}
