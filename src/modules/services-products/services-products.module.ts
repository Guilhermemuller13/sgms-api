import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ServicesProductsEntity } from './services-products.entity';
import { servicesProductsProviders } from './services-products.providers';

@Module({
  imports: [SequelizeModule.forFeature([ServicesProductsEntity])],
  providers: [servicesProductsProviders],
})
export class ServicesProductsModule {}
