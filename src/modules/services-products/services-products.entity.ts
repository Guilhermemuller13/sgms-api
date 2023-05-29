import { Table, Column, ForeignKey } from 'sequelize-typescript';
import { instanceToPlain } from 'class-transformer';

import { AbstractEntity } from '../common/models/abstract-entity';

import { ServiceEntity } from '../services/service.entity';
import { ProductsEntity } from '../products/products.entity';

@Table({ tableName: 'services_products' })
export class ServicesProductsEntity extends AbstractEntity {
  @ForeignKey(() => ServiceEntity)
  @Column
  service_id: number;

  @ForeignKey(() => ProductsEntity)
  @Column
  product_id: number;

  toJSON() {
    return instanceToPlain(this);
  }
}
