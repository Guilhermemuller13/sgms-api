import { Table, Column, ForeignKey } from 'sequelize-typescript';
import { instanceToPlain } from 'class-transformer';

import { AbstractEntity } from '../common/models/abstract-entity';

import { ProductsEntity } from '../products/products.entity';

@Table({ tableName: 'product_update' })
export class ProductUpdateEntity extends AbstractEntity {
  @ForeignKey(() => ProductsEntity)
  @Column
  product_id: number;

  @Column
  quantity: number;

  toJSON() {
    return instanceToPlain(this);
  }
}
