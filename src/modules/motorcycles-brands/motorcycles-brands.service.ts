import { Inject, Injectable } from '@nestjs/common';

import { MotorcyclesBrandEntity } from './motorcycles-brand.entity';
import { MOTORCYCLE_BRANDS_REPOSITORY } from '../../core/constants';

@Injectable()
export class MotorcyclesBrandsService {
  constructor(
    @Inject(MOTORCYCLE_BRANDS_REPOSITORY)
    private motorcyclesBrandsRepository: typeof MotorcyclesBrandEntity,
  ) {}

  async findAll(): Promise<MotorcyclesBrandEntity[]> {
    return await this.motorcyclesBrandsRepository.findAll<MotorcyclesBrandEntity>();
  }

  findOne(id: number) {
    return `This action returns a #${id} motorcyclesBrand`;
  }
}
