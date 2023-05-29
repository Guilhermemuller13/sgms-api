import { SERVICE_REPOSITORY } from '../../core/constants';
import { ServiceEntity } from './service.entity';

export const serviceProviders = {
  provide: SERVICE_REPOSITORY,
  useValue: ServiceEntity,
};
