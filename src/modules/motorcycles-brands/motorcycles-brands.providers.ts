import { MOTORCYCLE_BRANDS_REPOSITORY } from '../../core/constants';
import { MotorcyclesBrandEntity } from './motorcycles-brand.entity';

export const motorcyclesBrandsProviders = {
  provide: MOTORCYCLE_BRANDS_REPOSITORY,
  useValue: MotorcyclesBrandEntity,
};
