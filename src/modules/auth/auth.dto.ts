import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class LoginDTO {
  @IsString()
  @MinLength(4)
  password: string;

  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNumber()
  role_id: number;
}

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;
}
