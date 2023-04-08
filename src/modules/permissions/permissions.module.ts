import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionsEntity } from './permissions.entity';
import { permissionsProviders } from './permissions.providers';

@Module({
  imports: [SequelizeModule.forFeature([PermissionsEntity])],
  providers: [permissionsProviders],
})
export class PermissionsModule {}
