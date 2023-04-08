import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import {
  ERROR_INVALID_CREDENTIALS,
  USERS_REPOSITORY,
} from '../../core/constants';
import { AuthPayload } from '../common/types/auth-payload';
import { UserEntity } from '../users/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: typeof UserEntity,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate({ username }: AuthPayload) {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException(ERROR_INVALID_CREDENTIALS);
    }

    return user;
  }
}
