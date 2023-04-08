import { MOTORCYCLE_REPOSITORY } from '../../core/constants';
import { MotorcyclesEntity } from './motorcycles.entity';

export const motorcyclesProviders = {
  provide: MOTORCYCLE_REPOSITORY,
  useValue: MotorcyclesEntity,
};
