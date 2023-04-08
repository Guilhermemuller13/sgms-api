import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { MotorcyclesService } from './motorcycles.service';
import { MotorcyclesController } from './motorcycles.controller';
import { motorcyclesProviders } from './motorcycles.providers';
import { MotorcyclesEntity } from './motorcycles.entity';

@Module({
  imports: [SequelizeModule.forFeature([MotorcyclesEntity]), AuthModule],
  controllers: [MotorcyclesController],
  providers: [MotorcyclesService, motorcyclesProviders],
})
export class MotorcyclesModule {}
