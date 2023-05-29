import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServiceEntity } from './service.entity';
import { AuthModule } from '../auth/auth.module';
import { serviceProviders } from './service.providers';
import { servicesProductsProviders } from '../services-products/services-products.providers';
import { productsProviders } from '../products/products.providers';

@Module({
  imports: [SequelizeModule.forFeature([ServiceEntity]), AuthModule],
  controllers: [ServicesController],
  providers: [
    ServicesService,
    serviceProviders,
    servicesProductsProviders,
    productsProviders,
  ],
})
export class ServicesModule {}
