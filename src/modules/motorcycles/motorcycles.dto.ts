import { IsNumber, IsString } from 'class-validator';

export class MotorcycleDto {
  @IsString()
  license_plate: string;

  @IsString()
  year: string;

  @IsNumber()
  engine_capacity: string;
}

export class CreateMotorcycleDto extends MotorcycleDto {}

export class UpdateMotorcycleDto extends MotorcycleDto {}
