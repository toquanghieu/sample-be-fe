import { IsString, MinLength, IsNotEmpty } from "class-validator";
import { VALIDATION_MESSAGES } from "../constants";

/**
 * DTO for creating a new shoe with validation
 */
export class CreateShoeDTO {
  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.SHOE_NAME_REQUIRED })
  @MinLength(2, { message: VALIDATION_MESSAGES.SHOE_NAME_MIN_LENGTH })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.BRAND_REQUIRED })
  @MinLength(2, { message: VALIDATION_MESSAGES.BRAND_MIN_LENGTH })
  brand!: string;
}
