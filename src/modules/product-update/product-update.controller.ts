import { Controller } from '@nestjs/common';
import { ProductUpdateService } from './product-update.service';

@Controller('product-update')
export class ProductUpdateController {
  constructor(private readonly productUpdateService: ProductUpdateService) {}
}
