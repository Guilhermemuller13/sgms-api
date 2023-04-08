import { Sequelize } from 'sequelize-typescript';
import { RolesEntity } from '../../modules/role/roles.entity';
import { UserEntity } from '../../modules/users/users.entity';

import { SEQUELIZE } from '../constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        dialectOptions: {
          dateStrings: true,
          typeCast: true,
        },
        timezone: '-03:00',
      });

      sequelize.addModels([UserEntity, RolesEntity]);

      return sequelize;
    },
  },
];
