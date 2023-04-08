import { USERS_REPOSITORY } from '../../core/constants';
import { UserEntity } from './users.entity';

export const usersProviders = {
  provide: USERS_REPOSITORY,
  useValue: UserEntity,
};
