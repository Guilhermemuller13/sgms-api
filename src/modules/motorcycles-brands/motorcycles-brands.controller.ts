import { Controller, Get, Param } from '@nestjs/common';
import { MotorcyclesBrandsService } from './motorcycles-brands.service';

@Controller('motorcycles-brands')
export class MotorcyclesBrandsController {
  constructor(
    private readonly motorcyclesBrandsService: MotorcyclesBrandsService,
  ) {}

  @Get()
  findAll() {
    return this.motorcyclesBrandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motorcyclesBrandsService.findOne(+id);
  }
}
