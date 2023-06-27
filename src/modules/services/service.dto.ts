import { Type } from 'class-transformer';
import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class ServiceDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  description?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  name: string;

  @IsArray()
  // @ValidateNested({ each: true })
  products: { productId: string; quantity: number }[];

  @IsNumber()
  motorcycleId: number;

  @IsNumber()
  userId: number;
}

export class CreateServiceDto extends ServiceDto {}

export class UpdateServiceDto extends ServiceDto {}
