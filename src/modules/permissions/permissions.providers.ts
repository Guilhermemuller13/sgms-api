import { PERMISSIONS_REPOSITORY } from '../../core/constants';
import { PermissionsEntity } from './permissions.entity';

export const permissionsProviders = {
  provide: PERMISSIONS_REPOSITORY,
  useValue: PermissionsEntity,
};
