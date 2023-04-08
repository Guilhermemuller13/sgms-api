import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RolesEntity } from './roles.entity';
import { rolesProviders } from './roles.providers';

@Module({
  imports: [SequelizeModule.forFeature([RolesEntity])],
  providers: [rolesProviders],
})
export class RolesModule {}
