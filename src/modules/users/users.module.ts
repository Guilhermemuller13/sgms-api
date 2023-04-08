import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UserEntity } from './users.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([UserEntity]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService, usersProviders],
})
export class UsersModule {}
