import { SERVICE_PRODUCT_REPOSITORY } from '../../core/constants';
import { ServicesProductsEntity } from './services-products.entity';

export const servicesProductsProviders = {
  provide: SERVICE_PRODUCT_REPOSITORY,
  useValue: ServicesProductsEntity,
};
