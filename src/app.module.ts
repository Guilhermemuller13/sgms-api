import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpErrorFilter } from './modules/common/Error/http.error.filter';
import { RolesModule } from './modules/role/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesPermissionsModule } from './modules/roles-permissions/roles-permissions.module';
import { MotorcyclesModule } from './modules/motorcycles/motorcycles.module';
import { MotorcyclesBrandsModule } from './modules/motorcycles-brands/motorcycles-brands.module';
import { ServicesModule } from './modules/services/services.module';
import { ServicesProductsModule } from './modules/services-products/services-products.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true,
      sync: { force: false },
    }),

    AuthModule,
    UsersModule,
    ProductsModule,
    RolesModule,
    PermissionsModule,
    RolesPermissionsModule,
    MotorcyclesModule,
    MotorcyclesBrandsModule,
    ServicesModule,
    ServicesProductsModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
