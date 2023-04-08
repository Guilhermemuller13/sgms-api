import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { USERS_REPOSITORY } from '../../core/constants';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: typeof UserEntity,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll<UserEntity>();
  }

  async findOne(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne<UserEntity>({
      where: {
        id: userId,
      },
    });
  }

  updateUser(userId: number, data: UpdateUserDTO) {
    try {
      const motorcycle = this.userRepository.update(
        {
          ...data,
        },
        {
          where: {
            id: userId,
          },
        },
      );

      return motorcycle;
    } catch (error) {
      error = Object.values(error)[2];
      if (error.code === '23505') {
        throw new ConflictException(`${error.detail}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async createUser(data: CreateUserDTO): Promise<UserEntity> {
    try {
      const user = await this.userRepository.create({
        ...data,
        password: '',
      });

      return user;
    } catch (error) {
      error = Object.values(error)[2];
      if (error.code === '23505') {
        throw new ConflictException(`${error.detail}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteUser(userId: number) {
    try {
      await this.userRepository.destroy({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
