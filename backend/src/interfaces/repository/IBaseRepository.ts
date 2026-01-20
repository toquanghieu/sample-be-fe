/**
 * Base repository interface with common CRUD operations
 * @template T - Entity type
 * @template CreateDTO - DTO for creating entity
 */
export interface IBaseRepository<T, CreateDTO> {
  /**
   * Find all entities
   */
  findAll(): Promise<T[]>;

  /**
   * Find entity by ID
   */
  findById(id: string): Promise<T | null>;

  /**
   * Create a new entity
   */
  create(data: CreateDTO): Promise<T>;

  /**
   * Update an entity by ID
   */
  update(id: string, data: Partial<CreateDTO>): Promise<T | null>;

  /**
   * Delete an entity by ID
   */
  delete(id: string): Promise<T | null>;
}
