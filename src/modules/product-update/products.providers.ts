import { PRODUCTS_UPDATE_REPOSITORY } from '../../core/constants';
import { ProductUpdateEntity } from './product-update.entity';

export const productsUpdateProviders = {
  provide: PRODUCTS_UPDATE_REPOSITORY,
  useValue: ProductUpdateEntity,
};
