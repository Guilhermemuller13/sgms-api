import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RolesPermissionsEntity } from './roles-permissions.entity';
import { rolesPermissionsProviders } from './roles-permissions.providers';

@Module({
  imports: [SequelizeModule.forFeature([RolesPermissionsEntity])],
  providers: [rolesPermissionsProviders],
})
export class RolesPermissionsModule {}
