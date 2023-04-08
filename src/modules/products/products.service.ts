import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PRODUCTS_REPOSITORY } from '../../core/constants';
import { FileMulter } from '../common/types/file-multer';

import { CreateProductsDTO, UpdateProductsDTO } from './products.dto';
import { ProductsEntity } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private productsRepository: typeof ProductsEntity,
  ) {}

  async createProduct(data: CreateProductsDTO): Promise<ProductsEntity> {
    try {
      const product = await this.productsRepository.create({
        ...data,
        status: true,
        quantity: +data.quantity,
        quantity_minimum: +data.quantity_minimum,
      });

      return product;
    } catch (error) {
      error = Object.values(error)[2];
      if (error.code === '23505') {
        throw new ConflictException(`${error.detail}`);
      }

      throw new InternalServerErrorException();
    }
  }

  async uploadFiles(files: FileMulter[], productId: number) {
    const fileNames = files.map((file) => file.path).join(';');

    try {
      const product = await this.getProduct(productId);

      const fileList = JSON.parse(product.photos);
      const filesListNames = fileList.map((file) => file.src).join(';');
      const fileContactNames =
        !!filesListNames && !!fileNames ? `;${filesListNames}` : filesListNames;
      const files = fileNames.concat(fileContactNames);

      console.log({ fileNames, filesListNames, files });

      const productUpdated = await this.productsRepository.update(
        {
          photos: files,
        },
        {
          where: {
            id: productId,
          },
        },
      );

      return productUpdated;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateProduct(
    data: UpdateProductsDTO,
    productId: number,
  ): Promise<any> {
    try {
      const filterFiles = data.updatedFiles.filter(
        (file) => !file.src.includes('blob'),
      );
      const fileNames = filterFiles.map((file) => file.src).join(';');

      const product = await this.productsRepository.update(
        {
          ...data,
          status: true,
          quantity: +data.quantity,
          photos: fileNames,
        },
        {
          where: {
            id: productId,
          },
        },
      );

      return product;
    } catch (error) {
      error = Object.values(error)[2];
      if (error.code === '23505') {
        throw new ConflictException(`${error.detail}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteProduct(productId: number): Promise<any> {
    try {
      const product = await this.productsRepository.update(
        {
          available: false,
        },
        {
          where: {
            id: productId,
          },
        },
      );

      return product;
    } catch (error) {
      error = Object.values(error)[2];
      if (error.code === '23505') {
        throw new ConflictException(`${error.detail}`);
      }
      throw new InternalServerErrorException();
    }
  }

  async getProducts(): Promise<ProductsEntity[]> {
    return await this.productsRepository.findAll<ProductsEntity>();
  }

  async getProduct(productId: number): Promise<ProductsEntity> {
    try {
      const product = await this.productsRepository.findOne({
        where: {
          id: productId,
        },
      });

      if (!!product.photos) {
        const base_url = process.env.BASE_URL_SERVER;
        const files = product.photos.split(';').map((photo) => ({
          base_url: base_url,
          src: photo,
          id: photo.split('storage/products/')[1].split('.jpg')[0],
        }));

        product.photos = JSON.stringify(files);
      } else {
        product.photos = JSON.stringify([]);
      }

      return product;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
