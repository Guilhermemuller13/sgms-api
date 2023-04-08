import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { MOTORCYCLE_REPOSITORY } from '../../core/constants';
import { MotorcyclesEntity } from './motorcycles.entity';
import { CreateMotorcycleDto, UpdateMotorcycleDto } from './motorcycles.dto';

@Injectable()
export class MotorcyclesService {
  constructor(
    @Inject(MOTORCYCLE_REPOSITORY)
    private motorcyclesRepository: typeof MotorcyclesEntity,
  ) {}

  createMotorcycle(data: CreateMotorcycleDto) {
    try {
      const motorcycle = this.motorcyclesRepository.create({ ...data });

      return motorcycle;
    } catch (error) {
      error = Object.values(error)[2];
      if (error.code === '23505') {
        throw new ConflictException(`${error.detail}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async getMotorcycles(): Promise<MotorcyclesEntity[]> {
    return await this.motorcyclesRepository.findAll<MotorcyclesEntity>();
  }

  getMotorcycle(motorcycleId: number) {
    try {
      const motorcycle = this.motorcyclesRepository.findOne({
        where: {
          id: motorcycleId,
        },
      });

      return motorcycle;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  updateMotorcycle(motorcycleId: number, data: UpdateMotorcycleDto) {
    try {
      const motorcycle = this.motorcyclesRepository.update(
        {
          ...data,
        },
        {
          where: {
            id: motorcycleId,
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

  deleteMotorcycle(motorcycleId: number) {
    try {
      const motorcycle = this.motorcyclesRepository.destroy({
        where: {
          id: motorcycleId,
        },
      });

      return motorcycle;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
