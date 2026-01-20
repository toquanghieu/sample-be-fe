import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";
import { VALIDATION_MESSAGES } from "../constants";

/**
 * DTO for user registration with validation
 */
export class RegisterDTO {
  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL_INVALID })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.EMAIL_REQUIRED })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.PASSWORD_REQUIRED })
  @MinLength(6, { message: VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.NAME_REQUIRED })
  @MinLength(2, { message: VALIDATION_MESSAGES.NAME_MIN_LENGTH })
  name!: string;
}

/**
 * DTO for user login with validation
 */
export class LoginDTO {
  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL_INVALID })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.EMAIL_REQUIRED })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.PASSWORD_REQUIRED })
  password!: string;
}
