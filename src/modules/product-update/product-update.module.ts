import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProductUpdateService } from './product-update.service';
import { ProductUpdateController } from './product-update.controller';

import { ProductUpdateEntity } from './product-update.entity';

@Module({
  imports: [SequelizeModule.forFeature([ProductUpdateEntity])],
  controllers: [ProductUpdateController],
  providers: [ProductUpdateService],
})
export class ProductUpdateModule {}
