import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  ERROR_INVALID_CREDENTIALS,
  ERROR_USER_NOT_FOUND,
  ROLES_REPOSITORY,
  USERS_REPOSITORY,
} from '../../core/constants';
import { PermissionsEntity } from '../permissions/permissions.entity';
import { RolesEntity } from '../role/roles.entity';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { UserEntity } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: typeof UserEntity,

    @Inject(ROLES_REPOSITORY)
    private rolesRepository: typeof RolesEntity,

    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDTO) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error(ERROR_USER_NOT_FOUND);
      }

      if (!user.comparePassword(password)) {
        throw new UnauthorizedException(ERROR_INVALID_CREDENTIALS);
      }

      const userRole = await this.rolesRepository.findOne({
        where: {
          id: user.role_id,
        },
        include: {
          model: PermissionsEntity,
        },
      });

      const permissions = userRole.permissions.map(
        (permission) => permission.name,
      );

      const payload = { username: user.username, email: user.email };
      const token = this.jwtService.sign(payload);

      return {
        user: {
          email: user.email,
          name: user.username,
        },
        permission: {
          role: userRole.name,
          permissions,
        },
        token,
      };
    } catch (error) {
      throw new UnauthorizedException(ERROR_INVALID_CREDENTIALS);
    }
  }

  async register(data: RegisterDTO) {
    try {
      const user = await this.userRepository.create({
        ...data,
      });

      const userRole = await this.rolesRepository.findOne({
        where: {
          id: user.role_id,
        },
        include: {
          model: PermissionsEntity,
        },
      });

      const permissions = userRole.permissions.map(
        (permission) => permission.name,
      );

      const payload = { username: user.username, email: user.email };
      const token = this.jwtService.sign(payload);

      return {
        user: {
          email: user.email,
          name: user.username,
        },
        permission: {
          role: userRole.name,
          permissions,
        },
        token,
      };
    } catch (error) {
      error = Object.values(error)[2];
      if (error.code === '23505') {
        throw new ConflictException(`${error.detail}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async me({ email }: { email: string }) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error(ERROR_USER_NOT_FOUND);
      }

      const userRole = await this.rolesRepository.findOne({
        where: {
          id: user.role_id,
        },
        include: {
          model: PermissionsEntity,
        },
      });

      const permissions = userRole.permissions.map(
        (permission) => permission.name,
      );

      return {
        user: {
          email: user.email,
          name: user.username,
        },
        permission: {
          role: userRole.name,
          permissions,
        },
      };
    } catch (error) {
      throw new UnauthorizedException(ERROR_INVALID_CREDENTIALS);
    }
  }
}
