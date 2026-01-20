/**
 * Response DTO for user (without password)
 */
export type UserResponse = {
  id: string;
  email: string;
  name: string;
};

/**
 * Auth response with token
 */
export type AuthResponse = {
  user: UserResponse;
  token: string;
};
