import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MotorcyclesBrandsService } from './motorcycles-brands.service';
import { MotorcyclesBrandsController } from './motorcycles-brands.controller';
import { AuthModule } from '../auth/auth.module';
import { MotorcyclesBrandEntity } from './motorcycles-brand.entity';
import { motorcyclesBrandsProviders } from './motorcycles-brands.providers';

@Module({
  imports: [SequelizeModule.forFeature([MotorcyclesBrandEntity]), AuthModule],
  controllers: [MotorcyclesBrandsController],
  providers: [MotorcyclesBrandsService, motorcyclesBrandsProviders],
})
export class MotorcyclesBrandsModule {}
