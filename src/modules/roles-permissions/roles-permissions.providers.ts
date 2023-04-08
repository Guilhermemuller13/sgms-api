import { ROLES_PERMISSIONS_REPOSITORY } from '../../core/constants';
import { RolesPermissionsEntity } from './roles-permissions.entity';

export const rolesPermissionsProviders = {
  provide: ROLES_PERMISSIONS_REPOSITORY,
  useValue: RolesPermissionsEntity,
};
