/**
 * Shoe type
 */
export type Shoe = {
  id: string;
  name: string;
  brand: string;
};

/**
 * Create shoe DTO
 */
export type CreateShoeDTO = {
  name: string;
  brand: string;
};

/**
 * User type
 */
export type User = {
  id: string;
  email: string;
  name: string;
};

/**
 * Auth response type
 */
export type AuthResponse = {
  user: User;
  token: string;
};

/**
 * Login credentials
 */
export type LoginCredentials = {
  email: string;
  password: string;
};

/**
 * Register data
 */
export type RegisterData = {
  email: string;
  password: string;
  name: string;
};
