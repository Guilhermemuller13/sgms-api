import { Module } from '@nestjs/common';

import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { AuthModule } from '../auth/auth.module';
import { serviceProviders } from '../services/service.providers';
import { servicesProductsProviders } from '../services-products/services-products.providers';
import { productsProviders } from '../products/products.providers';
import { usersProviders } from '../users/users.providers';

@Module({
  imports: [AuthModule],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    serviceProviders,
    servicesProductsProviders,
    productsProviders,
    usersProviders,
  ],
})
export class DashboardModule {}
