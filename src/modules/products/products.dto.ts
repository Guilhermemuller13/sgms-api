import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class ProductsDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(4)
  code: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  description?: string;

  @IsString()
  @MinLength(4)
  brand: string;

  @IsNumber()
  quantity: number;

  // @IsString()
  // available?: string;

  @IsString()
  price: string;
}

export class CreateProductsDTO extends ProductsDto {
  @IsNumber()
  quantity_minimum: number;
}

export class UpdateProductsDTO extends ProductsDto {
  @IsString()
  @MinLength(4)
  @IsOptional()
  code: string;

  @IsOptional()
  files?: { src: string; id: string }[];

  @IsOptional()
  updatedFiles?: { src: string; id: string }[];
}
