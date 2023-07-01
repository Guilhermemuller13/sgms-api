import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import {
  PRODUCTS_REPOSITORY,
  SERVICE_PRODUCT_REPOSITORY,
  SERVICE_REPOSITORY,
  USERS_REPOSITORY,
} from '../../core/constants';

import { ServiceEntity } from '../services/service.entity';
import sequelize from 'sequelize';
import { ServicesProductsEntity } from '../services-products/services-products.entity';
import { ProductsEntity } from '../products/products.entity';
import { Op } from 'sequelize';
import { UserEntity } from '../users/users.entity';

@Injectable()
export class DashboardService {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private serviceRepository: typeof ServiceEntity,

    @Inject(SERVICE_PRODUCT_REPOSITORY)
    private serviceProductRepository: typeof ServicesProductsEntity,

    @Inject(PRODUCTS_REPOSITORY)
    private productsRepository: typeof ProductsEntity,

    @Inject(USERS_REPOSITORY)
    private userRepository: typeof UserEntity,
  ) {}

  async getDashboardResume() {
    try {
      const totalServices = await this.totalServices();
      const totalProducts = await this.totalProductsInStock();
      const totalProductsUsed = await this.totalProductsAlreadyUsed();
      const mostUsedProducts = await this.productsMotsUseds();
      const lastUsers = await this.lastUsersCreated();
      const lowStockProducts = await this.lowStockProducts();

      return {
        totalProducts,
        totalProductsUsed,
        totalServices,
        mostUsedProducts,
        lastUsers,
        lowStockProducts,
      };
    } catch (error) {
      error = Object.values(error)[2];

      console.log({ error });

      throw new InternalServerErrorException();
    }
  }

  async totalServices(): Promise<number> {
    try {
      const totalServices = await this.serviceRepository.count<ServiceEntity>();

      return totalServices;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async totalProductsInStock(): Promise<number> {
    try {
      const totalProducts =
        await this.productsRepository.count<ProductsEntity>();

      return totalProducts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async totalProductsAlreadyUsed(): Promise<number> {
    try {
      const prroductsUsed =
        await this.serviceProductRepository.count<ServicesProductsEntity>({
          attributes: [
            'quantity',
            [sequelize.fn('sum', sequelize.col('quantity')), 'total_products'],
          ],
          group: ['quantity'],
        });

      const totalProductsUsed = prroductsUsed.reduce(
        (previousValue, currentValue) =>
          +previousValue + +currentValue.total_products,
        0,
      );

      return totalProductsUsed;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async productsMotsUseds(): Promise<any[]> {
    try {
      const mostUsedProductsIds = await this.serviceProductRepository.findAll({
        where: {
          quantity: {
            [Op.gt]: 5,
          },
        },
        limit: 10,
        attributes: ['product_id'],
      });

      const productIds = mostUsedProductsIds.map(
        ({ product_id }) => product_id,
      );

      const mostUsedProducts = await this.productsRepository.findAll({
        where: {
          id: {
            [Op.in]: productIds,
          },
        },
      });

      const products = mostUsedProducts.map((product) => ({
        id: product.id,
        code: product.code,
        name: product.name,
        description: product.description,
        brand: product.brand,
        price: product.price,
        quantity: product.quantity,
        quantity_minimum: product.quantity_minimum,
        status: product.status,
        available: product.available,
      }));

      return products;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async lastUsersCreated(): Promise<any[]> {
    try {
      const lastUsers = await this.userRepository.findAll({
        order: [['id', 'ASC']],
        limit: 10,
      });

      const users = lastUsers.map((user) => ({
        id: user.id,
        email: user.email,
        username: user.username,
      }));

      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async lowStockProducts(): Promise<any[]> {
    try {
      const products = await this.productsRepository.findAll({
        order: [['id', 'ASC']],
        where: {
          quantity: {
            [Op.lt]: sequelize.col('quantity_minimum'),
          },
        },
      });

      const lowStockProducts = products.map((product) => ({
        id: product.id,
        quantity: product.quantity,
        quantity_minimum: product.quantity_minimum,
        code: product.code,
      }));

      return lowStockProducts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
