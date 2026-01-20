import type { RegisterDTO, LoginDTO } from "../../dto/auth.dto";
import type { AuthResponse, UserResponse } from "../../types/responses/AuthResponse";

/**
 * Service interface for authentication
 */
export interface IAuthService {
  /**
   * Register a new user
   */
  register(data: RegisterDTO): Promise<AuthResponse>;

  /**
   * Login user
   */
  login(data: LoginDTO): Promise<AuthResponse>;

  /**
   * Get current user from token
   */
  getCurrentUser(userId: string): Promise<UserResponse | null>;

  /**
   * Verify JWT token and return user ID
   */
  verifyToken(token: string): Promise<string | null>;
}
