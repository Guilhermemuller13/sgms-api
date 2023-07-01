import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UserDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNumber()
  role_id: number;
}

export class CreateUserDTO extends UserDTO {
  @IsString()
  @MinLength(4)
  @IsOptional()
  password: string;
}

export class UpdateUserDTO extends UserDTO {}
