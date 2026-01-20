/**
 * User entity type
 */
export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Data required to create a user
 */
export type CreateUserData = {
  email: string;
  password: string;
  name: string;
};
