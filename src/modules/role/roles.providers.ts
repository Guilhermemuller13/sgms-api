import { ROLES_REPOSITORY } from '../../core/constants';
import { RolesEntity } from './roles.entity';

export const rolesProviders = {
  provide: ROLES_REPOSITORY,
  useValue: RolesEntity,
};
