import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../common/shared/multerOptions';

import { CreateProductsDTO } from './products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body(ValidationPipe)
    data: CreateProductsDTO,
  ) {
    return this.productsService.createProduct(data);
  }

  @Post('/files/:id')
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('photos', 5, multerOptions))
  uploadFiles(@UploadedFiles() files, @Param('id') productId: number) {
    console.log({ files, productId });
    return this.productsService.uploadFiles(files, productId);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  delete(@Param('id') productId: number) {
    return this.productsService.deleteProduct(+productId);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') productId: number,
    @Body(ValidationPipe)
    data: CreateProductsDTO,
  ) {
    return this.productsService.updateProduct(data, +productId);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.productsService.getProducts();
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') productId: number) {
    return this.productsService.getProduct(productId);
  }
}
