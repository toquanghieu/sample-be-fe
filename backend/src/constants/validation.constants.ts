/**
 * Validation message constants
 */
export const VALIDATION_MESSAGES = {
  EMAIL_INVALID: "Please provide a valid email address",
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters",
  PASSWORD_REQUIRED: "Password is required",
  NAME_REQUIRED: "Name is required",
  NAME_MIN_LENGTH: "Name must be at least 2 characters",
  SHOE_NAME_REQUIRED: "Shoe name is required",
  SHOE_NAME_MIN_LENGTH: "Shoe name must be at least 2 characters",
  BRAND_REQUIRED: "Brand is required",
  BRAND_MIN_LENGTH: "Brand must be at least 2 characters",
} as const;
