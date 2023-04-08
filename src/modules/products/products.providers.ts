import { PRODUCTS_REPOSITORY } from '../../core/constants';
import { ProductsEntity } from './products.entity';

export const productsProviders = {
  provide: PRODUCTS_REPOSITORY,
  useValue: ProductsEntity,
};
