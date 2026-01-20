import { validate, ValidationError } from "class-validator";
import { plainToInstance, ClassConstructor } from "class-transformer";

/**
 * Validates a plain object against a DTO class
 * @param dto - The DTO class constructor
 * @param plain - The plain object to validate
 * @returns The validated DTO instance
 * @throws Error if validation fails
 */
export async function validateDTO<T extends object>(
  dto: ClassConstructor<T>,
  plain: object
): Promise<T> {
  const instance = plainToInstance(dto, plain);
  const errors = await validate(instance);

  if (errors.length > 0) {
    const messages = formatValidationErrors(errors);
    throw new Error(messages.join(", "));
  }

  return instance;
}

/**
 * Formats validation errors into readable messages
 */
function formatValidationErrors(errors: ValidationError[]): string[] {
  const messages: string[] = [];

  for (const error of errors) {
    if (error.constraints) {
      messages.push(...Object.values(error.constraints));
    }
    if (error.children && error.children.length > 0) {
      messages.push(...formatValidationErrors(error.children));
    }
  }

  return messages;
}
