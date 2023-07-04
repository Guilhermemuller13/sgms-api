import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateServiceDto, ServiceDto } from './service.dto';
import {
  PRODUCTS_REPOSITORY,
  SERVICE_PRODUCT_REPOSITORY,
  SERVICE_REPOSITORY,
} from '../../core/constants';
import { ServiceEntity } from './service.entity';
import { ServicesProductsEntity } from '../services-products/services-products.entity';
import { ProductsEntity } from '../products/products.entity';
import sequelize from 'sequelize';

type Product = { productId: string; quantity: number };

@Injectable()
export class ServicesService {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private serviceRepository: typeof ServiceEntity,

    @Inject(SERVICE_PRODUCT_REPOSITORY)
    private serviceProductRepository: typeof ServicesProductsEntity,

    @Inject(PRODUCTS_REPOSITORY)
    private productRepository: typeof ProductsEntity,
  ) {}

  async create(data: CreateServiceDto): Promise<ServiceEntity> {
    try {
      const service = await this.serviceRepository.create({
        ...data,
        motorcycle_id: data.motorcycleId,
        user_id: data.userId,
      });

      const listProducts = data.products.map((product) => ({
        service_id: service.id,
        product_id: product.productId,
        quantity: product.quantity,
      }));

      await this.serviceProductRepository.bulkCreate(listProducts);
      await this.updateProducts(data.products);

      return service;
    } catch (error) {
      error = Object.values(error)[2];
      if (error.code === '23505') {
        throw new ConflictException(`${error.detail}`);
      }

      if (error.code === '23503') {
        throw new NotFoundException(`${error.detail}`);
      }

      throw new InternalServerErrorException();
    }
  }

  async updateProducts(products: Product[] = []) {
    products.forEach(async (product) => {
      try {
        const productsUsed =
          await this.serviceProductRepository.count<ServicesProductsEntity>({
            attributes: [
              'quantity',
              [
                sequelize.fn('sum', sequelize.col('quantity')),
                'total_products',
              ],
            ],
            group: ['quantity'],
          });

        const totalProductsUsed = productsUsed.reduce(
          (previousValue, currentValue) =>
            +previousValue + +currentValue.total_products,
          0,
        );

        await this.productRepository.update(
          { quantity_in_service: totalProductsUsed },
          {
            where: {
              id: product.productId,
            },
          },
        );
      } catch (error) {}
    });
  }

  async findAll(): Promise<ServiceEntity[]> {
    return await this.serviceRepository.findAll<ServiceEntity>({});
  }

  async findOne(
    serviceId: number,
  ): Promise<{ service: ServiceEntity; products: ServicesProductsEntity[] }> {
    try {
      const service = await this.serviceRepository.findOne({
        where: {
          id: serviceId,
        },
      });

      if (!service) {
        throw new NotFoundException('SERVICE.NOT.FOUND');
      }

      const serviceProduct = await this.serviceProductRepository.findAll({
        where: {
          service_id: serviceId,
        },
      });

      return { service, products: serviceProduct };
    } catch (error) {
      if (error.message === 'SERVICE.NOT.FOUND') {
        throw new NotFoundException(`${error.message}`);
      }

      throw new InternalServerErrorException();
    }
  }

  async update(serviceId: number, data: ServiceDto) {
    try {
      const service = await this.serviceRepository.findOne({
        where: {
          id: serviceId,
        },
      });

      if (!service) {
        throw new NotFoundException('SERVICE.NOT.FOUND');
      }

      const serviceUpdated = await this.serviceRepository.update(
        { ...data, motorcycle_id: data.motorcycleId, user_id: data.userId },
        {
          where: {
            id: serviceId,
          },
        },
      );

      await this.serviceProductRepository.destroy({
        where: {
          service_id: serviceId,
        },
      });

      const listProducts = data.products.map((product) => ({
        service_id: service.id,
        product_id: product.productId,
        quantity: product.quantity,
      }));

      await this.serviceProductRepository.bulkCreate(listProducts);
      await this.updateProducts(data.products);

      return serviceUpdated;
    } catch (error) {
      console.log({ error: error });
      if (error.code === '23503') {
        throw new NotFoundException(`${error.detail}`);
      }

      if (error.message === 'SERVICE.NOT.FOUND') {
        throw new NotFoundException(`${error.message}`);
      }

      throw new InternalServerErrorException();
    }
  }

  async remove(serviceId: number) {
    try {
      const service = await this.serviceRepository.findOne({
        where: {
          id: serviceId,
        },
      });

      if (!service) {
        throw new NotFoundException('SERVICE.NOT.FOUND');
      }

      await this.serviceRepository.destroy({
        where: {
          id: serviceId,
        },
      });

      console.log({ serviceId });

      return serviceId;
    } catch (error) {
      if (error.code === '23503') {
        throw new NotFoundException(`${error.detail}`);
      }

      if (error.message === 'SERVICE.NOT.FOUND') {
        throw new NotFoundException(`${error.message}`);
      }

      throw new InternalServerErrorException();
    }
  }
}
