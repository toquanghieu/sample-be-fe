import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { IAuthService } from "../interfaces/service/IAuthService";
import type { IUserRepository } from "../interfaces/repository/IUserRepository";
import type { RegisterDTO, LoginDTO } from "../dto/auth.dto";
import type { User } from "../types/entities/User";
import type { AuthResponse, UserResponse } from "../types/responses/AuthResponse";
import { JWT_CONFIG, PASSWORD_CONFIG } from "../constants";

/**
 * Service implementation for authentication
 */
@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject("IUserRepository") private userRepository: IUserRepository
  ) {}

  /**
   * Maps a User entity to UserResponse DTO
   */
  private mapToResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  /**
   * Generate JWT token for user
   */
  private generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_CONFIG.SECRET, {
      expiresIn: JWT_CONFIG.EXPIRES_IN,
    });
  }

  async register(data: RegisterDTO): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      data.password,
      PASSWORD_CONFIG.SALT_ROUNDS
    );

    // Create user
    const user = await this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      name: data.name,
    });

    // Generate token
    const token = this.generateToken(user.id);

    return {
      user: this.mapToResponse(user),
      token,
    };
  }

  async login(data: LoginDTO): Promise<AuthResponse> {
    // Find user
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    // Generate token
    const token = this.generateToken(user.id);

    return {
      user: this.mapToResponse(user),
      token,
    };
  }

  async getCurrentUser(userId: string): Promise<UserResponse | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return null;
    }
    return this.mapToResponse(user);
  }

  async verifyToken(token: string): Promise<string | null> {
    try {
      const decoded = jwt.verify(token, JWT_CONFIG.SECRET) as { userId: string };
      return decoded.userId;
    } catch {
      return null;
    }
  }
}
