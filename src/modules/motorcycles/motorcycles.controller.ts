import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateMotorcycleDto, UpdateMotorcycleDto } from './motorcycles.dto';
import { MotorcyclesService } from './motorcycles.service';

@Controller('motorcycles')
export class MotorcyclesController {
  constructor(private readonly motorcyclesService: MotorcyclesService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body(ValidationPipe) createMotorcycleDto: CreateMotorcycleDto) {
    return this.motorcyclesService.createMotorcycle(createMotorcycleDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.motorcyclesService.getMotorcycles();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.motorcyclesService.getMotorcycle(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateMotorcycleDto: UpdateMotorcycleDto,
  ) {
    return this.motorcyclesService.updateMotorcycle(+id, updateMotorcycleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.motorcyclesService.deleteMotorcycle(+id);
  }
}
