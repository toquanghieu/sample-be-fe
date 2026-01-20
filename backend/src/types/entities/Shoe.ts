/**
 * Shoe entity type
 */
export type Shoe = {
  id: string;
  name: string;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Data required to create a shoe
 */
export type CreateShoeData = {
  name: string;
  brand: string;
};
