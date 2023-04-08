import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsEntity } from './products.entity';
import { AuthModule } from '../auth/auth.module';
import { productsProviders } from './products.providers';

@Module({
  imports: [SequelizeModule.forFeature([ProductsEntity]), AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService, productsProviders],
})
export class ProductsModule {}
